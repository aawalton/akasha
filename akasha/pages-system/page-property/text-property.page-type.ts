import type { PageType } from "../page-type/page-type.page-type.ts"
import type { PageProperty } from "./page-property.page-type.ts"
import type { Max } from "./properties/max.number-property.ts"
import type { NameFormatSlug } from "./properties/name-format-slug.relation-property.ts"

export type TextProperty = PageProperty & {
  max: Max
  nameFormatSlug: NameFormatSlug | null
}

export const textProperty = {
  id: "01a04dff-9d7d-7b50-a58a-419207af8ec0",
  pageTypeSlug: "page-type",
  slug: "text-property",
  definition: "a page property holding text",
  extendsSlug: "page-type/page-property",
  properties: [
    { propertySlug: "max", required: true, many: false },
    { propertySlug: "name-format-slug", required: true, many: false },
  ],
} as const satisfies PageType
