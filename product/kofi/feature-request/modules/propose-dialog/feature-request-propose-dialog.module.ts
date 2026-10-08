import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const featureRequestProposeDialog = {
  id: "01a0c53a-aedc-79c6-ab11-c2cea9c20ed0",
  type: "page-type/module",
  slug: "feature-request-propose-dialog",
  definition: "the dialog a contributor says an ask in to open a feature request",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dialog asks for the ask alone, the proposer and product being the site's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dialog says what opening a request costs before it is opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the dialog says of requests and points is read live from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask is held to the length its own property allows, by the field itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal the post answered is drawn in the dialog, which remains open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request that opened closes the dialog and tells the caller which slug opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the post goes is handed in, so this reaches no route of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A request that opened is read into the store at once rather than at the next poll.",
    },
  ],
  createdAt: "2026-09-21T18:29:12.540Z",
  updatedAt: "2026-09-27T12:24:04.000Z",
} as const satisfies Module
