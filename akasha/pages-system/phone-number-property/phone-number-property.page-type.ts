import type { PageProperty } from "../page-property/page-property.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type PhoneNumberProperty = PageProperty

export const phoneNumberProperty = {
  id: "01a053e9-5cd1-7137-9fbb-c33920c95575",
  pageTypeSlug: "page-type",
  slug: "phone-number-property",
  definition: "a page property holding a telephone number",
  pluralSlug: "phone-number-properties",
  extendsSlug: "page-type/page-property",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A number is written in E.164 and opens with `+` and holds digits alone.",
    },
    {
      invariantKind: "departure",
      statement: "A number carries its own country calling code.",
    },
    {
      invariantKind: "departure",
      statement: "A number reaching fifteen digits is the longest there is.",
    },
    {
      invariantKind: "departure",
      statement: "A number states no max.",
    },
  ],
} as const satisfies PageType
