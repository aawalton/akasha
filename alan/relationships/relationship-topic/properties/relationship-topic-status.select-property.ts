import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const relationshipTopicStatus = {
  id: "01a0658a-170f-750d-b59c-4ea32072c422",
  type: "page-type/select-property",
  slug: "relationship-topic-status",
  propertySlug: "relationship-topic-status",
  definition: "how far Alan is with a relationship topic",
  values: ["someday-maybe", "planned", "up-next", "in-progress", "done"],
  types: "ts",
  createdAt: "2026-09-03T04:32:23.823Z",
  updatedAt: "2026-10-30T16:24:22.574Z",
} as const satisfies SelectProperty
