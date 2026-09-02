import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type NarrowKey = string

export const narrowKey = {
  id: "01a063ee-2a3b-7005-88c7-33c0811a55ea",
  pageTypeSlug: "text-property",
  slug: "narrow-key",
  propertySlug: "key",
  definition: "the key one narrow reads off a page",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key no property declares and no page carries answers nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A key is spelled as the page carrying the key spells the key.",
    },
  ],
} as const satisfies TextProperty
