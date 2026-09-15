import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rebindOutcome = {
  id: "01a09098-2365-7377-876b-8d9e17c749d6",
  type: "page-type/module",
  slug: "rebind-outcome",
  definition: "what an attempt to move a request to another account answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An attempt either answers the caller a response or names the account to move to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rebind names the account moved to and the credential read for that account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The response answered is built again from the text the peek read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every attempt reaching an account answers in this one shape.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the status an attempt was made over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here chooses the account moved to.",
    },
  ],
} as const satisfies Module
