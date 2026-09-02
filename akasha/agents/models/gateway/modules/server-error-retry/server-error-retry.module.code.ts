import type { Forward } from "../forward/forward.module.code.ts"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import type { ObserverSlot } from "../observer-slot/observer-slot.module.code.ts"
import { peekResponse } from "../peek-response/peek-response.module.code.ts"
import { withTransportRetry } from "../retry/retry.module.code.ts"
import {
  classifyServerError,
  OVERLOADED_STATUS,
  RATE_LIMIT_STATUS,
  SERVER_ERROR_BACKOFF_MS,
  serverErrorBackoffMs,
} from "../server-error/server-error.module.code.ts"

const RETRIABLE_STATUSES: ReadonlySet<number> = new Set([
  RATE_LIMIT_STATUS,
  500,
  502,
  503,
  OVERLOADED_STATUS,
])

export type ServerErrorRetryOutcome =
  | { kind: "resolved"; res: Response }
  | { kind: "persistent"; response: Response }

export type ServerErrorRetryArgs = {
  res: Response
  req: Request
  currentAccount: string
  currentCred: OAuthCredential
  bodyBuffer: ArrayBuffer | null
  observerSlot: ObserverSlot
  trail: readonly string[]
  method: string
  pathname: string
  logPrefix: string
  forward: Forward
  schedule?: readonly number[]
  sleep?: (ms: number) => Promise<undefined>
}

type ServerErrorPeek =
  | { matched: false; res: Response }
  | {
      matched: true
      status: number
      reason: string
      retryAfterHeader: string | null
      rebuild: () => Response
    }

function defaultSleep(ms: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, ms)
  })
}

export function mayBeServerError(status: number): boolean {
  return RETRIABLE_STATUSES.has(status)
}

async function peekServerError(res: Response): Promise<ServerErrorPeek> {
  const status = res.status
  const retryAfterHeader = res.headers.get("retry-after")
  const peeked = await peekResponse(res)
  const classification = classifyServerError(status, peeked.bodyText)
  if (!classification.matched) return { matched: false, res: peeked.rebuild() }
  return {
    matched: true,
    status,
    reason: classification.reason,
    retryAfterHeader,
    rebuild: peeked.rebuild,
  }
}

export async function attemptServerErrorRetry(
  args: ServerErrorRetryArgs
): Promise<ServerErrorRetryOutcome> {
  const {
    res,
    req,
    currentAccount,
    currentCred,
    bodyBuffer,
    observerSlot,
    trail,
    method,
    pathname,
    logPrefix,
    forward,
  } = args
  const schedule = args.schedule ?? SERVER_ERROR_BACKOFF_MS
  const sleep = args.sleep ?? defaultSleep

  let peeked = await peekServerError(res)
  if (!peeked.matched) return { kind: "resolved", res: peeked.res }

  for (let attempt = 0; attempt < schedule.length; attempt += 1) {
    const wait = serverErrorBackoffMs({
      retryAfterHeader: peeked.retryAfterHeader,
      attempt,
      schedule,
    })
    console.log(
      `${logPrefix} ${peeked.status}/server-error observed account=${currentAccount} class=server-error; retry ${attempt + 1}/${schedule.length} after ${wait}ms reason=${peeked.reason}`
    )
    await sleep(wait)

    const retried = await withTransportRetry(
      () => forward(req, currentCred.accessToken, bodyBuffer, currentAccount, observerSlot),
      logPrefix,
      `${currentAccount} ${pathname} server-error-retry`
    )

    if (!mayBeServerError(retried.status)) return { kind: "resolved", res: retried }
    const next = await peekServerError(retried)
    if (!next.matched) return { kind: "resolved", res: next.res }
    peeked = next
  }

  console.error(
    `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=${peeked.status} server-error=persistent-after-${schedule.length}-retries reason=${peeked.reason}`
  )
  return { kind: "persistent", response: peeked.rebuild() }
}
