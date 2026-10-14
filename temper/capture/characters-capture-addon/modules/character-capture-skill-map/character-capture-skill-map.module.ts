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
  ],
  createdAt: "2026-09-02T09:20:33.955Z",
  updatedAt: "2026-10-14T13:36:57.585Z",
} as const satisfies Module
