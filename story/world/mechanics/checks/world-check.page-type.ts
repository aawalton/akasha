import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCheck = {
  id: "01a0de14-272c-7450-9354-16bc47966044",
  type: "page-type/page-type",
  slug: "world-check",
  definition: "a rule settling a declared action",
  pluralSlug: "checks",
  extends: ["page-type/world-mechanic", "page-type/domain"],
  parts: [
    "module-property-group/settling",
    "world-check/tower-attack-resolution",
    "world-check/tower-attribute-check",
    "world-check/tower-essence-absorption",
    "world-check/the-dating-game-closeness-scoring",
    "world-check/otherwhere-the-library-action-check",
    "world-check/otherwhere-the-library-harm",
    "world-check/otherwhere-the-library-standing",
    "world-check/otherwhere-action-check",
    "world-check/otherwhere-time-passing",
    "world-check/otherwhere-iii-time-passing",
    "world-check/otherwhere-iv-time-passing",
    "world-check/otherwhere-iv-action-check",
    "world-check/otherwhere-iv-needs",
    "world-check/otherwhere-v-time-passing",
    "world-check/otherwhere-v-action-check",
    "world-check/otherwhere-needs",
    "world-check/otherwhere-harm",
    "world-check/otherwhere-experience",
    "world-check/otherwhere-conditioning",
    "world-check/dragons-and-dungeons-check",
  ],
  properties: [{ pageProperty: "module-property-group/settling", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check's code is handed a reading and the dice rolled, and answers what they settle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check that rolls nothing is handed no dice.",
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
  loadedExport: ["settled", "added"],
} as const satisfies PageType
