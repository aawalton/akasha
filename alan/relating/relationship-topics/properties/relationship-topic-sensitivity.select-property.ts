import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const relationshipTopicSensitivity = {
  id: "01a0658a-170f-7cc5-825a-2417116e376a",
  pageTypeSlug: "select-property",
  type: "select-property",
  slug: "relationship-topic-sensitivity",
  propertySlug: "relationship-topic-sensitivity",
  definition: "how much care raising this topic takes",
  values: ["not-applicable", "low", "medium", "high", "critical"],
} as const satisfies SelectProperty

export type RelationshipTopicSensitivity = (typeof relationshipTopicSensitivity.values)[number]
