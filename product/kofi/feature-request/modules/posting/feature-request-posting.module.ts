import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const featureRequestPosting = {
  id: "01a0c5ff-3f64-7acf-b73a-4fa703762483",
  type: "page-type/module",
  slug: "feature-request-posting",
  definition: "the post a dialog opens or backs a feature request with, and what came back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One post carries both acts, so both dialogs read one answer the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A post that reached nothing reads as a refusal rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A post that reached nothing is refused as a phrase's slug, for the dialog to word.",
    },
  ],
  createdAt: "2026-09-21T22:03:54.596Z",
  updatedAt: "2026-09-27T16:31:44.000Z",
} as const satisfies Module
