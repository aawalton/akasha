import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { MaxLength } from "../types/page-properties/properties/max-length.number-property.ts"
import type { PageType } from "../types/page-type.page-type.ts"

export type TextProseProperty = PageProperty & {
  maxLength: MaxLength
}

export const textProseProperty = {
  id: "01a07c8e-42a4-7565-aa5e-89a5102b9e94",
  pageTypeSlug: "page-type",
  slug: "text-prose-property",
  definition: "a page property holding prose",
  pluralSlug: "text-prose-properties",
  prose: true,
  extendsSlug: ["page-type/page-property"],
  properties: [{ pagePropertySlug: "number-property/max-length", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A prose property states no name format.",
    },
    {
      invariantKind: "departure",
      statement: "A property moves here rather than stating that the property holds prose.",
    },
  ],
} as const satisfies PageType
