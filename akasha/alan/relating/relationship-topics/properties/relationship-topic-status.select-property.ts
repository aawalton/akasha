import type { SelectProperty } from "@akasha/pages-system/select-property"

export const relationshipTopicStatus = {
  id: "01a0658a-170f-750d-b59c-4ea32072c422",
  pageTypeSlug: "select-property",
  slug: "relationship-topic-status",
  propertySlug: "relationship-topic-status",
  definition: "how far a relationship topic has been taken",
  values: ["someday-maybe", "planned", "up-next", "in-progress", "done"],
} as const satisfies SelectProperty

export type RelationshipTopicStatus = (typeof relationshipTopicStatus.values)[number]
