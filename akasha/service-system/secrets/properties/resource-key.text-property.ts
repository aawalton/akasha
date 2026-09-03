import type { TextProperty } from "@akasha/pages-system/text-property"

export type ResourceKey = string

export const resourceKey = {
  id: "01a0684a-7d55-7001-9b0e-a4b8c7d61f20",
  pageTypeSlug: "text-property",
  slug: "resource-key",
  propertySlug: "resource-key",
  definition: "the key a value stands under inside the resource it belongs to",
  max: 253,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key is spelled as the resource spells it rather than as a slug is spelled.",
    },
  ],
} as const satisfies TextProperty
