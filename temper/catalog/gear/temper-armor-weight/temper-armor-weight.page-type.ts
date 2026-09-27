import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperArmorWeight = {
  id: "01a05fd1-d430-7564-8721-434ab188698f",
  type: "page-type/page-type",
  slug: "temper-armor-weight",
  definition: "how heavy a piece of armor is made",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "boolean-property/is-standard",
    "number-property/armor-base-value",
    "number-property/crafted-glyph-item-id",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/armor-base-value", required: true, many: false },
    { pageProperty: "boolean-property/is-standard", required: true, many: false },
    { pageProperty: "relation-property/skill-line", required: true, many: false },
    { pageProperty: "number-property/crafted-glyph-item-id", required: false, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
    { pageProperty: "number-property/armor-type", required: false, many: false },
    { pageProperty: "number-property/eso-weapon-type-number", required: false, many: false },
    { pageProperty: "number-property/level-slope", required: false, many: false },
    { pageProperty: "number-property/level-intercept", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A weight a piece is made in states how its legendary armor grows with item level.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A standard armor weight's hash place is the index a build hash has for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight states the armor type the game numbers it by, where it has one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight the game numbers as a weapon type states that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight's armor value at each quality is a grade under the weight.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
