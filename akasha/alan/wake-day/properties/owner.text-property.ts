import type { TextProperty } from "@akasha/pages-system/text-property"

export type Owner = string

export const owner = {
  id: "01a05fd8-c30f-7600-86de-1d33a70265bd",
  pageTypeSlug: "text-property",
  slug: "owner",
  propertySlug: "owner",
  definition: "the person a record belongs to",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a person.",
    },
  ],
} as const satisfies TextProperty
