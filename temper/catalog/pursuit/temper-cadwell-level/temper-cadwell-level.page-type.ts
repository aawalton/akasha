import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCadwellLevel = {
  id: "01a0616b-2cde-7001-a076-c5cb204d81f9",
  type: "page-type/page-type",
  slug: "temper-cadwell-level",
  definition: "a tier of progress through Cadwell's Almanac",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/stop-index",
    "number-property/zone-index",
    "page-property-entry/cadwell-stops",
  ],
  properties: [
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "page-property-entry/cadwell-stops", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A level's display order is the tier number Cadwell gives the level.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
