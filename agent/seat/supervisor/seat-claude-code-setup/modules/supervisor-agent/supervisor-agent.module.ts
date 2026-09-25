import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorAgent = {
  id: "01a0683e-3dbe-7003-8c74-a74611900fdd",
  type: "page-type/module",
  slug: "supervisor-agent",
  definition: "the account a seat runs under and the credential written for it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account named as a model account is selected by its slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat naming no account is given the default account seat launching gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An expired pinned account is refused headless and re-authenticated interactively.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pinned account with no credential falls back only where that account was not pinned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A credential that cannot be read is a fault rather than an account that is absent.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here renews a token.",
    },
  ],
} as const satisfies Module
