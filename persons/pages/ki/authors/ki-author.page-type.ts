import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const kiAuthor = {
  id: "01a06825-d0ec-792e-8a52-144c147087f5",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ki-author",
  definition: "someone who wrote a book Ki keeps",
  pluralSlug: "ki-authors",
  extends: ["page-type/ki-collection-template"],
  types: "ts",
} as const satisfies PageType
