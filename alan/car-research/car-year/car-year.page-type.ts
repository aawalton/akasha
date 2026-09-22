import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const carYear = {
  id: "01a0659d-2432-715e-b4e1-2cfa27018de7",
  type: "page-type/page-type",
  slug: "car-year",
  definition: "a model year of a nameplate",
  extends: ["page-type/car"],
  parts: [
    "number-property/model-year",
    "relation-property/car-model",
    "text-property/refresh-notes",
  ],
  properties: [
    { pageProperty: "number-property/model-year", required: true, many: false },
    { pageProperty: "text-property/refresh-notes", required: true, many: false },
    { pageProperty: "relation-property/car-model", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A year names the model above that year and never the trims below.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
