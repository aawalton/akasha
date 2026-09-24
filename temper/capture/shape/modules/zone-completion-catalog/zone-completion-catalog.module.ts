import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneCompletionCatalog = {
  id: "01a0604d-23a2-79a2-808b-325871382906",
  type: "page-type/module",
  slug: "zone-completion-catalog",
  definition: "the activities a zone counts towards completion, held under completion types",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone has completion types that have activities.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An activity has an id of its own beside its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion type has activities and nothing else.",
    },
  ],
} as const satisfies Module
