import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountWideVars = {
  id: "01a060b5-5ba8-7a8b-9378-5bd025a7cb9d",
  type: "module",
  slug: "account-wide-vars",
  definition: "the game's own account-wide saved table, held for as long as the add-on runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The table is asked for once and kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Asking for the table before the table was made up is an error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every character on the account sees the one table.",
    },
  ],
} as const satisfies Module
