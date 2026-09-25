import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountHealth = {
  id: "01a06869-4fee-7000-9180-62f07f2844dc",
  type: "page-type/module",
  slug: "model-account-health",
  definition: "what code writes for an account about its credential",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refresh that worked is taken as ok.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refresh that failed is taken as terminal where the failure says the refresh is terminal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refresh that failed is taken as retryable where the failure says that refresh is not terminal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refresh that is not terminal removes the terminal instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refresh that is terminal marks the moment handed in as the terminal instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A moment no instant reads from marks nothing rather than a removal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window trigger marks the moment handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An alert latch has the instant handed in rather than an instant read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A latch handed no instant is a removal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A latch handed blank text is a removal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A token is terminal only where the refresh is terminal and its access token has expired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token that is terminal and unalerted alerts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token that is terminal and already alerted alerts no second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refresh that worked clears a latch that is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token whose access token names no expiry is never terminal.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every instant this module works from is handed in by the caller.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says anything to a log.",
    },
  ],
} as const satisfies Module
