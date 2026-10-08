import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountWideVars = {
  id: "01a060b5-5ba8-7a8b-9378-5bd025a7cb9d",
  type: "page-type/module",
  slug: "account-wide-vars",
  definition: "the game's own account-wide saved table, held for as long as the add-on runs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is asked for once and kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking for the table before the table was made up is an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every character on the account sees the one table.",
    },
  ],
  createdAt: "2026-09-02T06:01:33.352Z",
  updatedAt: "2026-09-21T15:10:19.000Z",
} as const satisfies Module
