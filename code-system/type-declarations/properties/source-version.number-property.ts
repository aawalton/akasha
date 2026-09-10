import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type SourceVersion = number

export const sourceVersion = {
  id: "01a08234-f12b-7ac2-bfbb-0dd5515b7b36",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "source-version",
  propertySlug: "source-version",
  definition: "the version the source was at when a generated declaration was written",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The version is read from the source rather than chosen by whoever runs the command.",
    },
    {
      invariantKind: "departure",
      statement: "Two generated declarations stating different versions are a partial run.",
    },
  ],
} as const satisfies NumberProperty
