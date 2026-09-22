import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const collectionCompletion = {
  id: "01a07231-dd66-7ecf-a99e-fe95f4120495",
  type: "page-type/computed-property",
  slug: "collection-completion",
  propertySlug: "completion",
  definition: "a collection's progress as a stage rather than an amount",
  holds: "text",
  values: ["completed", "in-progress", "not-started"],
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection whose length or progress is absent is taken as not started.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
