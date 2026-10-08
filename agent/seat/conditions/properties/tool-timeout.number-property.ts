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
  createdAt: "2026-09-03T18:13:56.765Z",
  updatedAt: "2026-09-25T17:55:17.000Z",
} as const satisfies NumberProperty
