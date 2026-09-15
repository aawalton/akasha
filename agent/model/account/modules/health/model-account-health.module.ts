import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountHealth = {
  id: "01a06869-4fee-7000-9180-62f07f2844dc",
  type: "page-type/module",
  slug: "model-account-health",
  definition: "what an upkeep pass records of an account's health",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refresh that worked reads as ok.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refresh that failed reads as terminal where the failure says the refresh is terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refresh that failed reads as retryable where the failure says that refresh is not terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refresh that is not terminal removes the terminal instant.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refresh that is terminal marks the moment handed in as the terminal instant.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A moment no instant reads from marks nothing rather than a removal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A window trigger marks the moment handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An alert latch has the instant handed in rather than an instant read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A latch handed no instant is a removal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A latch handed blank text is a removal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A token is terminal only where the refresh is terminal and its access token has expired.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token that is terminal and unalerted alerts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token that is terminal and already alerted alerts no second time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refresh that worked clears a latch that is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token whose access token names no expiry is never terminal.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every instant this module works from is handed in by the caller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says anything to a log.",
    },
  ],
} as const satisfies Module
