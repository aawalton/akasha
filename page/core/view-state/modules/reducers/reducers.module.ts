import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reducers = {
  id: "01a05b92-a9c7-78e7-86ac-75649bdb58ed",
  type: "page-type/module",
  slug: "reducers",
  definition: "the effects a view-editing command produces",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two nav items may each have a view of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every key written for a new view is a key the view page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view names its nav and its page type by page type and slug.",
    },
  ],
} as const satisfies Module
