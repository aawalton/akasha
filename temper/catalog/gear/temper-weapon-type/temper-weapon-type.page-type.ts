import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperWeaponType = {
  id: "01a05fd1-d442-7b45-8a20-d4ff90ea6255",
  type: "page-type/page-type",
  slug: "temper-weapon-type",
  definition: "a kind of weapon",
  extends: ["page-type/temper-gear-thing"],
  parts: [
    "number-property/enchantment-multiplier",
    "number-property/weapon-type-power",
    "text-property/eso-weapon-type",
    "number-property/eso-weapon-type-number",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/enchantment-multiplier", required: true, many: false },
    { pageProperty: "text-property/eso-weapon-type", required: true, many: false },
    { pageProperty: "boolean-property/is-two-handed", required: true, many: false },
    { pageProperty: "number-property/weapon-type-power", required: true, many: false },
    { pageProperty: "one-of-property/valid-slots", required: true, many: true, maxCount: null },
    { pageProperty: "relation-property/skill-line", required: false, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
    { pageProperty: "number-property/eso-weapon-type-number", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weapon type's hash place is the index a build hash has for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon type's power at each quality is a grade under the weapon type.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
