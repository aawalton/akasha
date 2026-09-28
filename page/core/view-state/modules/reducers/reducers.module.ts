import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const reducers = {
  id: "01a05b92-a9c7-78e7-86ac-75649bdb58ed",
  type: "page-type/module",
  slug: "reducers",
  definition: "the effects a view-editing command produces",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A view's settings are written as the view properties a view page is read by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter on today is written as a narrow on the day or on the day after it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A filter no narrow can say is left unwritten.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A setting the view page type declares no property for is left unwritten.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A view's page type is written only where the update names its slug.",
    },
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
