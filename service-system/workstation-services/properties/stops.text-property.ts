import type { TextProperty } from "@akasha/pages-system/text-property"

export type Stops = string

export const stops = {
  id: "01a06738-9f12-776d-8c5e-1f8340434ace",
  pageTypeSlug: "text-property",
  slug: "stops",
  propertySlug: "stops",
  definition: "a command line a unit runs to bring down what it started",
  max: 500,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commands run in the order the commands are written in.",
    },
  ],
} as const satisfies TextProperty
