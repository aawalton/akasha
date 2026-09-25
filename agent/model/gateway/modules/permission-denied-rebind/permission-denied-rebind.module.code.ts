import type { OAuthCredential } from "akasha/agent/model/account/modules/oauth-types/oauth-types.module.code.ts"
import { peekResponse } from "akasha/agent/model/gateway/modules/peek-response/peek-response.module.code.ts"
import {
  classifyPermissionDenied,
  PERMISSION_DENIED_STATUS,
} from "akasha/agent/model/gateway/modules/permission-denied/permission-denied.module.code.ts"
import { decideReasonMarkAction } from "akasha/agent/model/gateway/modules/reason-marks/reason-marks.module.code.ts"
import {
  answeredFrom,
  type RebindOutcome,
} from "akasha/agent/model/gateway/modules/rebind-outcome/rebind-outcome.module.code.ts"

export type MarkDisabled = (
  account: string,
  reason: string,
  logPrefix: string
) => Promise<undefined>

export type PermissionDeniedRebindArgs = {
  res: Response
  currentAccount: string
  trail: readonly string[]
  tried: ReadonlySet<string>
  method: string
  pathname: string
  logPrefix: string
  markedByReason: Map<string, string>
  pickAccount: (exclude: ReadonlySet<string>) => Promise<string | null>
  getFreshToken: (account: string) => Promise<OAuthCredential | null>
  logRes: (account: string, status: number) => undefined
  markDisabled: MarkDisabled
  clearDisabled: (account: string, logPrefix: string) => Promise<undefined>
  said?: (line: string) => undefined
}

function consoleSaid(line: string): undefined {
  console.log(line)
}

export async function attemptPermissionDeniedRebind(
  args: PermissionDeniedRebindArgs
): Promise<RebindOutcome> {
  const { currentAccount, trail, tried, method, pathname, logPrefix } = args
  const said = args.said ?? consoleSaid
  const peeked = await peekResponse(args.res)
  const answered = (): RebindOutcome => answeredFrom(peeked)

  const classification = classifyPermissionDenied(PERMISSION_DENIED_STATUS, peeked.bodyText)
  if (!classification.matched) {
    if (trail.length === 1) {
      args.logRes(currentAccount, PERMISSION_DENIED_STATUS)
    } else {
      said(`${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=403`)
    }
    return answered()
  }

  const decision = decideReasonMarkAction(
    args.markedByReason,
    classification.reason,
    currentAccount
  )
  if (decision.action === "global-unmark") {
    await args.clearDisabled(decision.firstAccount, logPrefix)
    said(
      `${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=403 rebind=global-unmarked unmarked=${decision.firstAccount} reason=${classification.reason}`
    )
    return answered()
  }

  said(
    `${logPrefix} 403 permission_error observed account=${currentAccount}; disable+rebind reason=${classification.reason}`
  )
  await args.markDisabled(currentAccount, classification.reason, logPrefix)
  args.markedByReason.set(classification.reason, currentAccount)

  const nextAccount = await args.pickAccount(tried)
  if (nextAccount === null || tried.has(nextAccount)) {
    const reason = nextAccount === null ? "no-viable-account" : "looped"
    said(
      `${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=403 rebind=${reason} disabled=true`
    )
    return answered()
  }

  const nextCred = await args.getFreshToken(nextAccount)
  if (nextCred === null) {
    said(
      `${logPrefix} res ${method} ${pathname} account=${trail.join("→")}→${nextAccount} status=403 rebind=no-fresh-token disabled=true`
    )
    return answered()
  }

  return { kind: "rebind", account: nextAccount, cred: nextCred }
}
