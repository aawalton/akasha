import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingFocusScripts = {
  id: "01a060db-b2bb-7166-ba4a-b183afce5394",
  type: "page-type/module",
  slug: "scribing-focus-scripts",
  definition: "the primary scribing scripts, each saying what a grimoire does",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A focus script's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A focus script moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["FOCUS_SCRIPT_DATA"],
} as const satisfies Module
