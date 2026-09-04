import type { Module } from "@akasha/code-system/module"

export const claudeAccountHealth = {
  id: "01a06869-4fee-7000-9180-62f07f2844dc",
  pageTypeSlug: "module",
  slug: "claude-account-health",
  definition: "what an upkeep pass records of an account's health",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refresh that worked reads as ok.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh that failed reads as terminal where the failure says it is terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh that failed reads as retryable where the failure says it is not.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh that is not terminal removes the terminal instant.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh that is terminal marks the moment handed in as the terminal instant.",
    },
    {
      invariantKind: "departure",
      statement: "A moment no instant reads from marks nothing rather than a removal.",
    },
    {
      invariantKind: "departure",
      statement: "A window trigger marks the moment handed in.",
    },
    {
      invariantKind: "departure",
      statement: "An alert latch carries the instant handed in rather than one read here.",
    },
    {
      invariantKind: "departure",
      statement: "A latch handed no instant is a removal.",
    },
    {
      invariantKind: "departure",
      statement: "A latch handed blank text is a removal, which is what such a mark would mean.",
    },
    {
      invariantKind: "departure",
      statement:
        "A token is terminal only where the refresh is terminal and its access token has expired.",
    },
    {
      invariantKind: "departure",
      statement: "A token that is terminal and unalerted alerts.",
    },
    {
      invariantKind: "departure",
      statement: "A token that is terminal and already alerted alerts no second time.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh that worked clears a latch that stands.",
    },
    {
      invariantKind: "departure",
      statement: "A token whose access token names no expiry is never terminal.",
    },
    {
      invariantKind: "departure",
      statement:
        "An at-limit instant further out than the threshold from the moment handed in is stale.",
    },
    {
      invariantKind: "departure",
      statement: "An at-limit instant exactly the threshold out is not stale.",
    },
    {
      invariantKind: "departure",
      statement: "An account naming no at-limit instant is never stale.",
    },
    {
      invariantKind: "departure",
      statement: "The threshold a stale at-limit mark is found at is the OAuth backoff cap.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in a threshold other than that cap.",
    },
    {
      invariantKind: "constraint",
      statement: "Every instant this module works from is handed in by the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says anything to a log.",
    },
    {
      invariantKind: "gap",
      statement: "A stale at-limit mark is found here while the healing is done by the caller.",
    },
    {
      invariantKind: "gap",
      statement: "A stale at-limit mark names the account and says nothing of which window it is.",
    },
  ],
} as const satisfies Module
