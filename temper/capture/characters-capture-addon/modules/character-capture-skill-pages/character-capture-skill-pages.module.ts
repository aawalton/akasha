import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureSkillPages = {
  id: "01a0e062-b6c8-702c-b74f-ccc8ad13269d",
  type: "page-type/module",
  slug: "character-capture-skill-pages",
  definition: "the skill, scribed skill and skill line pages an add-on compiles in, one list each",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each page type is compiled in once, carrying every field its readers need.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list is built the first time it is asked for rather than as the add-on loads.",
    },
  ],
} as const satisfies Module
