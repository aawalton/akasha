import type { TextProperty } from "@akasha/pages-system/text-property"

export type Version = string

export const version = {
  id: "01a05fd8-c30e-725c-ab9a-c6711e453753",
  pageTypeSlug: "text-property",
  slug: "version",
  propertySlug: "version",
  definition: "which shape of a record was written",
  max: 10,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A version reads as a number and is written as text.",
    },
    {
      invariantKind: "departure",
      statement: "Writing it as a number would flatten `1.0` to `1`.",
    },
  ],
} as const satisfies TextProperty
