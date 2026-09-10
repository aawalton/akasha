import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ResourceKey = string

export const resourceKey = {
  id: "01a0684a-7d55-7001-9b0e-a4b8c7d61f20",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "resource-key",
  propertySlug: "resource-key",
  definition: "the key a value sits under inside the resource it belongs to",
  maxLength: 253,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The key is spelled as the resource spells that key rather than as a slug is spelled.",
    },
  ],
} as const satisfies TextProperty
