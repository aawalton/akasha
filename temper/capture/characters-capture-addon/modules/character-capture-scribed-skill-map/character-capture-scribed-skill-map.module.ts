import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureScribedSkillMap = {
  id: "01a0d62c-d5b4-75e1-b4ce-b66ae5e37c6b",
  type: "page-type/module",
  slug: "character-capture-scribed-skill-map",
  definition:
    "each grimoire and focus script pair against its scribed skill's place in a build hash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is its scribed skill's place in the scribed skills table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scribed skill is found by its grimoire and focus script rather than by its ability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The places are read from the scribed skill pages as the add-on compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scribed skill pages are compiled in here once, for every reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scribed skill on a bar is written at its place in the skills table.",
    },
  ],
  createdAt: "2026-09-25T01:27:37.652Z",
  updatedAt: "2026-10-14T13:36:57.585Z",
} as const satisfies Module
