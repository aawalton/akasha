import type { PageType } from "@akasha/pages-system/page-type"
import type { KiCollectionTemplate } from "../ki-collection-templates/ki-collection-template.page-type.ts"

export type KiAuthor = KiCollectionTemplate

export const kiAuthor = {
  id: "01a06825-d0ec-792e-8a52-144c147087f5",
  pageTypeSlug: "page-type",
  slug: "ki-author",
  definition: "someone who wrote a book Ki keeps",
  pluralSlug: "ki-authors",
  extendsSlug: ["page-type/ki-collection-template"],
} as const satisfies PageType
