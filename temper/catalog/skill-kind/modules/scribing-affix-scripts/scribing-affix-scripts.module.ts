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
      statement: "The table is a view over the affix script pages the skill catalogue holds.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An affix script's place in this table is the index a build hash has.",
    },
  ],
} as const satisfies Module
