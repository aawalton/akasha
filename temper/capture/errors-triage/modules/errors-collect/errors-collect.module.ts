import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsCollect = {
  id: "01a060cd-5650-7b6e-ab6c-41d8a589a7ce",
  type: "page-type/module",
  slug: "errors-collect",
  definition: "every error entry taken out of what each account saved",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every account in the saved file is gathered from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An account saving no entries adds nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The entries keep the order the accounts were saved in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No entry is weighed here.",
    },
  ],
} as const satisfies Module
