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
  ],
} as const satisfies Module
