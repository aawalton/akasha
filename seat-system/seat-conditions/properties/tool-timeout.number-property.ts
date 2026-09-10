import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type ToolTimeout = number

export const toolTimeout = {
  id: "01a0687a-3d9d-7cc0-8dbb-09100312e372",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "tool-timeout",
  propertySlug: "tool-timeout",
  definition: "how long a seat waits on a tool over the model context protocol before giving up",
  max: null,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The agent harness reads this number as milliseconds.",
    },
  ],
} as const satisfies NumberProperty
