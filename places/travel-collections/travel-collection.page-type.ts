import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const travelCollection = {
  id: "01a06807-be66-700e-8f4d-f3b9e45380d1",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "travel-collection",
  definition: "a shelf of places Alan means to travel to",
  pluralSlug: "travel-collections",
  extends: ["page-type/collection"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
