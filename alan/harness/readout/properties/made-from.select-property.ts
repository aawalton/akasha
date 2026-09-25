import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const madeFrom = {
  id: "01a0d994-2a69-7e64-9e80-4ac684ab847a",
  type: "page-type/select-property",
  slug: "made-from",
  propertySlug: "made-from",
  definition: "which of the opened day's files a readout's reading is made from",
  values: ["open-block", "day-row", "day-row-and-stretches", "day-row-and-food-entries"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating this is taken again as those files change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating nothing here is taken by nothing that follows the opened day.",
    },
  ],
  types: "ts",
} as const satisfies SelectProperty
