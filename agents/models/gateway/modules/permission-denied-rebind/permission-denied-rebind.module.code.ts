import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import { peekResponse } from "../peek-response/peek-response.module.code.ts"
import {
  classifyPermissionDenied,
  PERMISSION_DENIED_STATUS,
} from "../permission-denied/permission-denied.module.code.ts"

export type PermissionDeniedRebindOutcome =
  | { kind: "response"; response: Response }
  | { kind: "rebind"; account: string; cred: OAuthCredential }

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
  pickAccount: (exclude: ReadonlySet<string>) => Promise<string | null>
  getFreshToken: (account: string) => Promise<OAuthCredential | null>
  logRes: (account: string, status: number) => undefined
  markDisabled: MarkDisabled
}

export async function attemptPermissionDeniedRebind(
  args: PermissionDeniedRebindArgs
): Promise<PermissionDeniedRebindOutcome> {
  const { currentAccount, trail, tried, method, pathname, logPrefix } = args
  const peeked = await peekResponse(args.res)
  const answered = (): PermissionDeniedRebindOutcome => ({
    kind: "response",
    response: peeked.rebuild(),
  })

  const classification = classifyPermissionDenied(PERMISSION_DENIED_STATUS, peeked.bodyText)
  if (!classification.matched) {
    if (trail.length === 1) {
      args.logRes(currentAccount, PERMISSION_DENIED_STATUS)
    } else {
      console.log(`${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=403`)
    }
    return answered()
  }

  console.log(
    `${logPrefix} 403 permission_error observed account=${currentAccount}; disable+rebind reason=${classification.reason}`
  )
  await args.markDisabled(currentAccount, classification.reason, logPrefix)

  const nextAccount = await args.pickAccount(tried)
  if (nextAccount === null || tried.has(nextAccount)) {
    const reason = nextAccount === null ? "no-viable-account" : "looped"
    console.log(
      `${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=403 rebind=${reason} disabled=true`
    )
    return answered()
  }

  const nextCred = await args.getFreshToken(nextAccount)
  if (nextCred === null) {
    console.log(
      `${logPrefix} res ${method} ${pathname} account=${trail.join("→")}→${nextAccount} status=403 rebind=no-fresh-token disabled=true`
    )
    return answered()
  }

  return { kind: "rebind", account: nextAccount, cred: nextCred }
}
