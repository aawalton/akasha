import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type Stops = string

export const stops = {
  id: "01a06738-9f12-776d-8c5e-1f8340434ace",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "stops",
  propertySlug: "stops",
  definition: "a command line a unit runs to bring down what it started",
  maxLength: 500,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commands run in the order the commands are written in.",
    },
  ],
} as const satisfies TextProperty
