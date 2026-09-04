import type { TextProperty } from "@akasha/pages-system/text-property"

export type QueryArgument = string

export const queryArgument = {
  id: "01a063bd-a526-74de-8e2c-45aa36499261",
  pageTypeSlug: "text-property",
  slug: "query-argument",
  propertySlug: "query-argument",
  definition: "the argument a reading's query takes its key as",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A readout naming an argument spends its key filling that argument.",
    },
    {
      invariantKind: "departure",
      statement:
        "The day a reading is asked for fills a day argument rather than the argument named here.",
    },
  ],
} as const satisfies TextProperty
