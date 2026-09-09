import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { MaxLength } from "../types/page-properties/properties/max-length.number-property.ts"
import type { PageType } from "../types/page-type.page-type.ts"
import type { NameFormat } from "./properties/name-format.relation-property.ts"

export type TextProperty = PageProperty & {
  maxLength: MaxLength
  nameFormat: NameFormat | null
}

export const textProperty = {
  id: "01a04dff-9d7d-7b50-a58a-419207af8ec0",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "text-property",
  definition: "a page property holding text",
  pluralSlug: "text-properties",
  parts: ["relation-property/name-format"],
  extends: ["page-type/page-property"],
  properties: [
    { pageProperty: "number-property/max-length", required: true, many: false },
    { pageProperty: "relation-property/name-format", required: true, many: false },
  ],
} as const satisfies PageType
