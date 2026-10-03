import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settleTaking = {
  id: "01a1019b-5c58-702b-951c-3fc5ff239f6b",
  type: "page-type/module",
  slug: "settle-taking",
  definition: "what a call to settle a check is handed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is JSON keyed by the names the check reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn named by its address is taken as its slug.",
    },
  ],
} as const satisfies Module
