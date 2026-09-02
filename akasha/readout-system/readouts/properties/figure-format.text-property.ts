import type { TextProperty } from "@akasha/pages-system/text-property"

export type FigureFormat = "integer" | "decimal"

export const figureFormat = {
  id: "01a05fe9-0ef3-7c0a-b22b-eca063337fa1",
  pageTypeSlug: "text-property",
  slug: "figure-format",
  propertySlug: "figure-format",
  definition: "how the number a reading is gets written out",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A figure written as an integer is written to the nearest whole number.",
    },
    {
      invariantKind: "departure",
      statement: "A figure written as a decimal is written to no more than two places.",
    },
    {
      invariantKind: "departure",
      statement: "A figure written as a decimal drops trailing zeros.",
    },
    {
      invariantKind: "departure",
      statement: "A figure that rounds onto zero is written as zero rather than as a signed zero.",
    },
    {
      invariantKind: "constraint",
      statement: "A readout stating no format has its reading written as the number it is.",
    },
  ],
} as const satisfies TextProperty
