import type { SelectProperty } from "@akasha/pages-system/select-property"

export const toDoPriority = {
  id: "01a065a1-49b7-7880-b138-f141f4b9971f",
  pageTypeSlug: "select-property",
  slug: "to-do-priority",
  propertySlug: "to-do-priority",
  definition: "how far up the list a to-do stands",
  values: ["p1", "p2", "p3", "p4"],
} as const satisfies SelectProperty

export type ToDoPriority = (typeof toDoPriority.values)[number]
