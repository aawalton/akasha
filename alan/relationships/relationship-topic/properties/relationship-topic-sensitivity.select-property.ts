import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const relationshipTopicSensitivity = {
  id: "01a0658a-170f-7cc5-825a-2417116e376a",
  type: "page-type/select-property",
  slug: "relationship-topic-sensitivity",
  propertySlug: "relationship-topic-sensitivity",
  definition: "how much care raising this topic takes",
  values: ["not-applicable", "low", "medium", "high", "critical"],
  types: "ts",
} as const satisfies SelectProperty
