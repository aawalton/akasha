import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureSkillLineGroups = {
  id: "01a0616b-aaf2-7d29-bf88-e33b5830c654",
  type: "page-type/module",
  slug: "character-capture-skill-line-groups",
  definition: "which skill lines belong to each class, each race, and the base game",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The groups are read from the class, race and skill line pages as the add-on compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The emperor's skill line is in no base group, as no character starts with it.",
    },
  ],
} as const satisfies Module
