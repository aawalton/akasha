import {
  classifyModelUnavailable,
  decideModelUnavailableAction,
  MODEL_UNAVAILABLE_STATUS,
} from "../model-unavailable/model-unavailable.module.code.ts"
import type { OAuthCredential } from "../oauth-types/oauth-types.module.code.ts"
import { peekResponse } from "../peek-response/peek-response.module.code.ts"

export type ModelUnavailableRebindOutcome =
  | { kind: "response"; response: Response }
  | { kind: "rebind"; account: string; cred: OAuthCredential }

export type ModelUnavailableRebindArgs = {
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
  markDisabled: (account: string, reason: string, logPrefix: string) => Promise<undefined>
  clearDisabled: (account: string, logPrefix: string) => Promise<undefined>
}

export async function attemptModelUnavailableRebind(
  args: ModelUnavailableRebindArgs
): Promise<ModelUnavailableRebindOutcome> {
  const { currentAccount, trail, tried, method, pathname, logPrefix } = args
  const peeked = await peekResponse(args.res)
  const answered = (): ModelUnavailableRebindOutcome => ({
    kind: "response",
    response: peeked.rebuild(),
  })
  const trailSaid = trail.join("→")

  const classification = classifyModelUnavailable(MODEL_UNAVAILABLE_STATUS, peeked.bodyText)
  if (!classification.matched) {
    console.error(
      `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trailSaid} status=404 rebind=none-unmatched`
    )
    return answered()
  }

  const decision = decideModelUnavailableAction(
    args.markedByReason,
    classification.reason,
    currentAccount
  )
  if (decision.action === "global-unmark") {
    await args.clearDisabled(decision.firstAccount, logPrefix)
    console.error(
      `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trailSaid} status=404 rebind=global-unmarked unmarked=${decision.firstAccount} reason=${classification.reason}`
    )
    return answered()
  }

  console.log(
    `${logPrefix} 404 not_found observed account=${currentAccount}; disable+rebind reason=${classification.reason}`
  )
  await args.markDisabled(currentAccount, `model_unavailable: ${classification.reason}`, logPrefix)
  args.markedByReason.set(classification.reason, currentAccount)

  const nextAccount = await args.pickAccount(tried)
  if (nextAccount === null || tried.has(nextAccount)) {
    const reason = nextAccount === null ? "no-viable-account" : "looped"
    console.error(
      `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trailSaid} status=404 rebind=${reason} disabled=true`
    )
    return answered()
  }

  const nextCred = await args.getFreshToken(nextAccount)
  if (nextCred === null) {
    console.error(
      `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trailSaid}→${nextAccount} status=404 rebind=no-fresh-token disabled=true`
    )
    return answered()
  }

  return { kind: "rebind", account: nextAccount, cred: nextCred }
}
