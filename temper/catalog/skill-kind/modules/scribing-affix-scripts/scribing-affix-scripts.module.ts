import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingAffixScripts = {
  id: "01a060db-b2ba-73c7-8faa-80842e2c1379",
  type: "page-type/module",
  slug: "scribing-affix-scripts",
  definition: "the tertiary scribing scripts, each putting a buff or a debuff on a grimoire",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A affix script's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A affix script moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["AFFIX_SCRIPT_DATA"],
} as const satisfies Module
