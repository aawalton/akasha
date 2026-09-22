import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const featureRequestServing = {
  id: "01a0c4b2-cf45-7ceb-8448-9eb1b945d7ad",
  type: "page-type/module",
  slug: "feature-request-serving",
  definition: "the feature requests a product has at given standings, most points first",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The points a feature request has are its boosts added up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A feature request no one has boosted has no points rather than none at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Feature requests level on points come back newest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The newer of two feature requests is the one whose uuid v7 id is the greater.",
    },
  ],
} as const satisfies Module
