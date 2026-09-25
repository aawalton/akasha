import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const toolTimeout = {
  id: "01a0687a-3d9d-7cc0-8dbb-09100312e372",
  type: "page-type/number-property",
  slug: "tool-timeout",
  propertySlug: "tool-timeout",
  definition: "the limit on the time a seat waits on an mcp program",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The agent harness reads this number as milliseconds.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
