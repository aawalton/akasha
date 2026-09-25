type ReasonMarkAction =
  | { action: "mark-rebind" }
  | { action: "global-unmark"; firstAccount: string }

export function decideReasonMarkAction(
  markedByReason: ReadonlyMap<string, string>,
  reason: string,
  currentAccount: string
): ReasonMarkAction {
  const firstAccount = markedByReason.get(reason)
  if (firstAccount != null && firstAccount !== currentAccount) {
    return { action: "global-unmark", firstAccount }
  }
  return { action: "mark-rebind" }
}
