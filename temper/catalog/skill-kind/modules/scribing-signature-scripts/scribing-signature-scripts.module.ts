import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingSignatureScripts = {
  id: "01a060db-b2bb-78c2-a678-b0ddc7114f93",
  type: "page-type/module",
  slug: "scribing-signature-scripts",
  definition: "the secondary scribing scripts, each shaping how a grimoire is cast",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is a view over the signature script pages the skill catalogue holds.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A signature script's place in this table is the index a build hash has.",
    },
  ],
} as const satisfies Module
