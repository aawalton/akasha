import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionThing = {
  id: "01a05fcc-694c-762c-bcd1-1691361636e2",
  type: "page-type/page-type",
  slug: "temper-companion-thing",
  definition: "anything with a page on the companion side of the catalog",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/equip-type",
    "text-property/equipment-icon-name",
    "number-property/ttc-item-id",
    "text-property/piece-name",
  ],
  properties: [
    { pageProperty: "number-property/equip-type", required: false, many: false },
    { pageProperty: "text-property/equipment-icon-name", required: false, many: false },
    { pageProperty: "number-property/ttc-item-id", required: false, many: false },
    { pageProperty: "text-property/piece-name", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every place a companion wears a thing is named by one number.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
