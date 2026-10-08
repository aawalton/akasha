import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreSavedVariables = {
  id: "01a061fc-ceea-76dd-8b6b-a1e1f14f9219",
  type: "page-type/module",
  slug: "sets-core-saved-variables",
  definition: "the account-wide settings this library remembers between sessions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A second load is refused once the saved variables are already in hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A favorite saved under an unknown category is moved to the star category on load.",
    },
  ],
  createdAt: "2026-09-02T11:59:13.130Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
