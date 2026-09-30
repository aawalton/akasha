import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const currencyDenominations = {
  id: "01a0f1da-0621-76cf-b877-bbc4880d2a10",
  type: "page-type/record-property",
  slug: "currency-denominations",
  propertySlug: "denominations",
  definition: "one coin or unit a currency is counted in",
  properties: [
    { pageProperty: "text-property/denomination-name", required: true, many: false },
    { pageProperty: "number-property/denomination-worth", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The smallest denomination of a currency is worth one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse is drawn in the largest denominations that fit it, largest first.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
