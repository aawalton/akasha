import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionArmorWeight = {
  id: "01a0debe-d7ef-75ff-9915-543ddba45c06",
  type: "page-type/page-type",
  slug: "temper-companion-armor-weight",
  definition: "how heavy a companion's body armor is made",
  extends: ["page-type/temper-companion-thing"],
  parts: [
    "number-property/armor-type",
    "relation-property/armor-passive",
    "relation-property/armor-skill-line",
    "number-property/ttc-category-id",
  ],
  properties: [
    { pageProperty: "number-property/ttc-category-id", required: false, many: false },
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
    { pageProperty: "number-property/armor-type", required: false, many: false },
    { pageProperty: "relation-property/armor-passive", required: false, many: false },
    { pageProperty: "relation-property/armor-skill-line", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An armor weight's build-hash place is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An armor weight states the armor type the game numbers it by, where it has one.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
