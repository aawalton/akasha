import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const featureRequestBoostDialog = {
  id: "01a0c5fd-bf7b-75a9-9cc6-33e841e2381f",
  type: "page-type/module",
  slug: "feature-request-boost-dialog",
  definition: "the dialog a contributor boosts a feature request with points in",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dialog asks how many points alone, the request being the one pressed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dialog says what is held before any of it is committed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal the post answered is drawn in the dialog, which remains open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points that moved are read into the store at once rather than at the next poll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the post goes is handed in, so this reaches no route of its own.",
    },
  ],
} as const satisfies Module
