import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCheck = {
  id: "01a0de14-272c-7450-9354-16bc47966044",
  type: "page-type/page-type",
  slug: "world-check",
  definition: "a rule settling a declared action with a roll",
  pluralSlug: "checks",
  extends: ["page-type/world-mechanic", "page-type/domain"],
  parts: [
    "module-property-group/settling",
    "world-check/tower-attack-resolution",
    "world-check/tower-attribute-check",
    "world-check/tower-essence-absorption",
    "world-check/harem-hotel-attack-resolution",
  ],
  properties: [{ pageProperty: "module-property-group/settling", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check's code is handed a reading and the dice rolled, and answers what they settle.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing a check's code does rolls a die.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check refuses a reading that is not the shape its code reads.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
