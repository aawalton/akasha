import type { Finding } from "../finding.page-type.ts"

export const aRefusalNamesFourAttemptsWhereOneWasSpent = {
  id: "01a05b34-b267-710c-9afa-f0f53520decb",
  pageTypeSlug: "finding",
  slug: "a-refusal-names-four-attempts-where-one-was-spent",
  domainSlug: "workspace-package/pages-query",
  claim:
    "A refusal the store states for its own reasons is tried once and then reported as `this was attempt 4 of 4 and nothing came back`. The count is a constant rather than what was spent, and the words say nothing came back when a refusal did.",
  evidence:
    "`postingTo` loops while `worthRetrying(held.status)`, which is false for a 400, so a refused call is made once. The tail is appended to every unsuccessful answer whatever the count, spelling `ATTEMPTS` both times.\n\nSeen tonight: a write deliberately made stale answered `the page store replied 400: ... read against `dbe667c6` ... nothing was written — read them again against what stands now — this was attempt 4 of 4 and nothing came back`. One attempt was made, and what came back was the store's whole reason.\n\nThis matters because `store-reaching` states as an invariant that a reason names how many attempts were spent, and because a caller reading `nothing came back` will look for a network fault rather than for the refusal sitting in the same sentence.\n\nThe call taken, Alan being asleep: leave it tonight and file it. It misleads a reader rather than losing a write, and the refusal it trails is carried whole and correct. Whoever fixes it counts the rounds actually run and says the tail only where nothing was answered.",
} as const satisfies Finding
