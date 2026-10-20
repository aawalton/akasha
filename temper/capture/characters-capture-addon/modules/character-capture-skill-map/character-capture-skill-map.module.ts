import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureSkillMap = {
  id: "01a0616b-8ea3-7699-aef6-4c54ee5ce7ec",
  type: "page-type/module",
  slug: "character-capture-skill-map",
  definition: "each skill's game id against its place in a build hash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place written here decodes to a skill with the same game id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index written is a skill's place among every skill page in hashPlace order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill page taken out leaves no gap among the indices written.",
    },
  ],
  createdAt: "2026-09-02T09:20:33.955Z",
  updatedAt: "2026-10-20T01:59:27.731Z",
} as const satisfies Module
