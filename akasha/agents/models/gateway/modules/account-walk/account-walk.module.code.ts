import type { PickAccount } from "../account-picker/account-picker.module.code.ts"
import { attemptAuthFailedRetry } from "../auth-failed-retry/auth-failed-retry.module.code.ts"
import { classifyCapacity429 } from "../capacity-classification/capacity-classification.module.code.ts"
import {
  asksExtendedContext,
  rewrittenToBaseSibling,
} from "../extended-context-model/extended-context-model.module.code.ts"
import { isFableRequest } from "../fable-fallback/fable-fallback.module.code.ts"
import {
  ANTHROPIC_BETA_HEADER,
  requestsFastMode,
  stripFastMode,
} from "../fast-mode-strip/fast-mode-strip.module.code.ts"
import { attemptForcedToolChoiceRewrite } from "../forced-tool-choice/forced-tool-choice.module.code.ts"
import type { Forward } from "../forward/forward.module.code.ts"
import { attemptModelUnavailableRebind } from "../model-unavailable-rebind/model-unavailable-rebind.module.code.ts"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import type { ObserverSlot } from "../observer-slot/observer-slot.module.code.ts"
import { peekResponse } from "../peek-response/peek-response.module.code.ts"
import { attemptPermissionDeniedRebind } from "../permission-denied-rebind/permission-denied-rebind.module.code.ts"
import type { QueueOutcome } from "../pre-forward-queue/pre-forward-queue.module.code.ts"
import { withTransportRetry } from "../retry/retry.module.code.ts"
import { attemptServerErrorRetry } from "../server-error-retry/server-error-retry.module.code.ts"

export const BAD_GATEWAY = 502

export const RATE_LIMIT_STATUS = 429

const SERVER_ERROR_STATUSES: ReadonlySet<number> = new Set([429, 500, 502, 503, 529])

export type AccountWalkSeams = {
  readonly logPrefix: string
  readonly pickAccount: PickAccount
  readonly getFreshToken: (account: string) => Promise<OAuthCredential | null>
  readonly forward: Forward
  readonly markAtLimit: (args: {
    account: string
    retryAfterHeader: string | null
    logPrefix: string
  }) => Promise<undefined>
  readonly markDisabled: (account: string, reason: string, logPrefix: string) => Promise<undefined>
  readonly clearDisabled: (account: string, logPrefix: string) => Promise<undefined>
  readonly repollAfterLimit: (account: string) => Promise<undefined>
}

export type AccountWalkArgs = {
  readonly req: Request
  readonly observerSlot: ObserverSlot
  readonly originalBody: ArrayBuffer | null
  readonly method: string
  readonly pathname: string
  readonly seams: AccountWalkSeams
}

export async function runAccountWalk(args: AccountWalkArgs): Promise<QueueOutcome> {
  const { req, observerSlot, originalBody, method, pathname, seams } = args
  const { logPrefix, pickAccount, getFreshToken, forward } = seams

  const logRes = (account: string, status: number): undefined => {
    console.log(`${logPrefix} res ${method} ${pathname} account=${account} status=${status}`)
  }
  const accountNamed = async (exclude: ReadonlySet<string>): Promise<string | null> =>
    (await pickAccount(exclude))?.account ?? null

  let bodyBuffer = originalBody
  let currentReq = req
  let fableMode = isFableRequest(bodyBuffer)

  const firstPick = await pickAccount()
  if (firstPick === null) {
    return { kind: "empty-pool", reason: "no-viable-account", trailDisplay: "-" }
  }
  const firstAccount = firstPick.account

  const firstCred = await getFreshToken(firstAccount)
  if (firstCred === null) {
    const res = await forward(req, null, bodyBuffer, null, observerSlot)
    console.log(
      `${logPrefix} res ${method} ${pathname} account=- status=${res.status} fallthrough=no-fresh-token account-picked=${firstAccount}`
    )
    return { kind: "served", response: res }
  }

  const tried = new Set<string>()
  const trail: string[] = []
  const markedByReason = new Map<string, string>()
  const authRetried = new Set<string>()
  let currentAccount = firstAccount
  let currentCred = firstCred
  let toolChoiceRewritten = false
  let baseSiblingTried = false
  let fastModeStripped = false

  while (true) {
    tried.add(currentAccount)
    trail.push(currentAccount)
    let res: Response
    try {
      res = await withTransportRetry(
        () =>
          forward(currentReq, currentCred.accessToken, bodyBuffer, currentAccount, observerSlot),
        logPrefix,
        `${currentAccount} ${pathname}`
      )
    } catch (thrown) {
      const said = thrown instanceof Error ? thrown.message : String(thrown)
      console.error(
        `${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=502 transport-error=${said}`
      )
      return {
        kind: "served",
        response: new Response(null, { status: BAD_GATEWAY, statusText: "Bad Gateway" }),
      }
    }

    if (SERVER_ERROR_STATUSES.has(res.status)) {
      const outcome = await attemptServerErrorRetry({
        res,
        req: currentReq,
        currentAccount,
        currentCred,
        bodyBuffer,
        observerSlot,
        trail,
        method,
        pathname,
        logPrefix,
        forward,
      })
      if (outcome.kind === "persistent") return { kind: "served", response: outcome.response }
      res = outcome.res
    }

    if (res.status === 403) {
      const outcome = await attemptPermissionDeniedRebind({
        res,
        currentAccount,
        trail,
        tried,
        method,
        pathname,
        logPrefix,
        pickAccount: accountNamed,
        getFreshToken,
        logRes,
        markDisabled: seams.markDisabled,
      })
      if (outcome.kind === "response") return { kind: "served", response: outcome.response }
      currentAccount = outcome.account
      currentCred = outcome.cred
      continue
    }

    if (res.status === 400 && !toolChoiceRewritten) {
      toolChoiceRewritten = true
      const outcome = await attemptForcedToolChoiceRewrite({
        res,
        bodyBuffer,
        currentAccount,
        trail,
        method,
        pathname,
        logPrefix,
        logRes,
      })
      if (outcome.kind === "response") return { kind: "served", response: outcome.response }
      bodyBuffer = outcome.rewrittenBody
      continue
    }

    if (res.status === 404) {
      if (!baseSiblingTried && bodyBuffer !== null && asksExtendedContext(bodyBuffer)) {
        baseSiblingTried = true
        const rewritten = rewrittenToBaseSibling(bodyBuffer)
        if (rewritten !== null) {
          await res.body?.cancel()
          bodyBuffer = rewritten
          fableMode = isFableRequest(bodyBuffer)
          console.log(
            `${logPrefix} extended-context-fallback ${method} ${pathname} account=${currentAccount} — [1m] model_unavailable; downshifted to base sibling, replay same account`
          )
          continue
        }
      }
      const outcome = await attemptModelUnavailableRebind({
        res,
        currentAccount,
        trail,
        tried,
        method,
        pathname,
        logPrefix,
        markedByReason,
        pickAccount: accountNamed,
        getFreshToken,
        markDisabled: seams.markDisabled,
        clearDisabled: seams.clearDisabled,
      })
      if (outcome.kind === "response") return { kind: "served", response: outcome.response }
      currentAccount = outcome.account
      currentCred = outcome.cred
      continue
    }

    if (res.status === 401 && !authRetried.has(currentAccount)) {
      authRetried.add(currentAccount)
      const outcome = await attemptAuthFailedRetry({
        res,
        currentAccount,
        currentToken: currentCred.accessToken,
        trail,
        method,
        pathname,
        logPrefix,
        getFreshToken,
      })
      if (outcome.kind === "response") return { kind: "served", response: outcome.response }
      currentCred = outcome.credential
      continue
    }

    if (res.status !== RATE_LIMIT_STATUS) {
      if (res.status >= 400) {
        console.error(
          `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=${res.status}`
        )
      } else if (trail.length === 1) {
        logRes(currentAccount, res.status)
      } else {
        console.log(
          `${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=${res.status}`
        )
      }
      return { kind: "served", response: res }
    }

    const retryAfterHeader = res.headers.get("retry-after")
    const peeked = await peekResponse(res)
    const capacity = classifyCapacity429(res.headers, peeked.bodyText)
    console.log(
      `${logPrefix} 429 body account=${currentAccount} error.type=${peeked.errorType ?? "unknown"} capacity=${capacity.kind}${
        capacity.kind === "not-capacity" ? `/${capacity.signal}` : ""
      } (${capacity.reason})`
    )

    if (
      !fastModeStripped &&
      requestsFastMode(bodyBuffer, currentReq.headers.get(ANTHROPIC_BETA_HEADER))
    ) {
      fastModeStripped = true
      const stripped = stripFastMode({ bodyBuffer, headers: currentReq.headers })
      if (stripped !== null) {
        console.log(
          `${logPrefix} fast-mode-strip ${method} ${pathname} account=${currentAccount} — 429 on a fast-mode request (capacity=${capacity.kind}); stripped speed+beta, replay same account before any mark`
        )
        bodyBuffer = stripped.body
        currentReq = new Request(currentReq.url, {
          method: currentReq.method,
          headers: stripped.headers,
        })
        continue
      }
    }

    if (capacity.kind === "not-capacity") {
      console.error(
        `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=429 not-capacity=${capacity.reason}`
      )
      return { kind: "served", response: peeked.rebuild() }
    }

    if (fableMode) {
      console.log(`${logPrefix} 429 observed account=${currentAccount} class=fable; rebind`)
    } else {
      console.log(`${logPrefix} 429 observed account=${currentAccount}; mark+rebind`)
      await seams.markAtLimit({ account: currentAccount, retryAfterHeader, logPrefix })
    }

    const repolled = currentAccount
    seams.repollAfterLimit(repolled).catch((thrown: unknown) => {
      console.error(`${logPrefix} repoll-after-limit account=${repolled} failed`, thrown)
    })

    const nextAccount = await accountNamed(tried)
    if (nextAccount === null || tried.has(nextAccount)) {
      const reason = nextAccount === null ? "no-viable-account" : "looped"
      return { kind: "empty-pool", reason, trailDisplay: trail.join("→") }
    }
    const nextCred = await getFreshToken(nextAccount)
    if (nextCred === null) {
      return {
        kind: "empty-pool",
        reason: "no-fresh-token",
        trailDisplay: `${trail.join("→")}→${nextAccount}`,
      }
    }
    currentAccount = nextAccount
    currentCred = nextCred
  }
}
