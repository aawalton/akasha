import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionEquipmentQuality = {
  id: "01a05fcd-aed0-75bf-9fe4-d95291c165fb",
  type: "page-type/page-type",
  slug: "temper-companion-equipment-quality",
  definition: "the grade of a piece of companion equipment",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "number-property/light-armor-value",
    "number-property/medium-armor-value",
    "number-property/heavy-armor-value",
    "number-property/one-handed-weapon-damage",
    "number-property/two-handed-weapon-damage",
    "number-property/shield-armor-value",
  ],
  properties: [
    { pageProperty: "number-property/light-armor-value", required: true, many: false },
    { pageProperty: "number-property/medium-armor-value", required: true, many: false },
    { pageProperty: "number-property/heavy-armor-value", required: true, many: false },
    { pageProperty: "number-property/one-handed-weapon-damage", required: true, many: false },
    { pageProperty: "number-property/two-handed-weapon-damage", required: true, many: false },
    { pageProperty: "number-property/shield-armor-value", required: true, many: false },
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "boolean-property/available", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A quality's build-hash place is the index a build hash has.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
