import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type ValueSlug = string

export const valueSlug = {
  id: "01a0534e-c7e0-74c3-9eea-499d48af54db",
  pageTypeSlug: "text-property",
  slug: "value-slug",
  propertySlug: "value-slug",
  definition: "the value a persona stands for",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "The six values a persona stands for do not stand as pages.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a value.",
    },
  ],
} as const satisfies TextProperty
