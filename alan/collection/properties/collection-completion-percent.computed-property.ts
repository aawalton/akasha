import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const collectionCompletionPercent = {
  id: "01a14fc5-e903-7d23-8ab4-ae4bd2de0a7a",
  type: "page-type/computed-property",
  slug: "collection-completion-percent",
  propertySlug: "completion-percent",
  definition: "how much of the collection and everything it holds is done, out of a hundred",
  holds: "number",
  code: "ts",
  types: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection with no length states no percent.",
    },
  ],
  createdAt: "2026-10-18T16:08:52.738Z",
  updatedAt: "2026-10-18T16:08:52.738Z",
} as const satisfies ComputedProperty
