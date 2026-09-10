import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const showCollection = {
  id: "01a06807-be66-7006-8d8a-389b26e79b07",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "show-collection",
  definition: "a shelf of shows Alan keeps together",
  pluralSlug: "show-collections",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
