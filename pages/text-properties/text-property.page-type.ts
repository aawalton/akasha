import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { MaxLength } from "../types/page-properties/properties/max-length.number-property.ts"
import type { PageType } from "../types/page-type.page-type.ts"
import type { NameFormatSlug } from "./properties/name-format-slug.relation-property.ts"

export type TextProperty = PageProperty & {
  maxLength: MaxLength
  nameFormatSlug: NameFormatSlug | null
}

export const textProperty = {
  id: "01a04dff-9d7d-7b50-a58a-419207af8ec0",
  pageTypeSlug: "page-type",
  slug: "text-property",
  definition: "a page property holding text that is not prose",
  pluralSlug: "text-properties",
  prose: false,
  partSlugs: ["relation-property/name-format-slug"],
  extendsSlug: ["page-type/page-property"],
  properties: [
    { pagePropertySlug: "number-property/max-length", required: true, many: false },
    { pagePropertySlug: "relation-property/name-format-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A text property holds a name or a value read by a machine rather than as English.",
    },
  ],
} as const satisfies PageType
