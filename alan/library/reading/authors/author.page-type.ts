import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const author = {
  id: "01a06807-be66-7000-b600-748274bb5ac8",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "author",
  definition: "one who wrote what Alan reads",
  pluralSlug: "authors",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
} as const satisfies PageType
