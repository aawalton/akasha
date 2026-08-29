import type { PageProperty } from "../page-property/page-property.page-type.ts"
import type { Max } from "../page-property/properties/max.number-property.ts"
import type { NameFormatSlug } from "../page-property/properties/name-format-slug.relation-property.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type TextProperty = PageProperty & {
  max: Max
  nameFormatSlug: NameFormatSlug | null
}

export const textProperty = {
  id: "01a04dff-9d7d-7b50-a58a-419207af8ec0",
  pageTypeSlug: "page-type",
  slug: "text-property",
  definition: "a page property holding text",
  pluralSlug: "text-properties",
  partSlugs: ["relation-property/name-format-slug"],
  extendsSlug: "page-type/page-property",
  properties: [
    { pagePropertySlug: "max", required: true, many: false },
    { pagePropertySlug: "name-format-slug", required: true, many: false },
  ],
} as const satisfies PageType
