import type { ComputedProperty } from "@akasha/pages-system/computed-property"

export type CollectionCompletion = "completed" | "in-progress" | "not-started"

export const collectionCompletion = {
  id: "01a07231-dd66-7ecf-a99e-fe95f4120495",
  pageTypeSlug: "computed-property",
  slug: "collection-completion",
  propertySlug: "completion",
  definition: "a collection's progress as a stage rather than an amount",
  holds: "text",
  code: "ts",
} as const satisfies ComputedProperty
