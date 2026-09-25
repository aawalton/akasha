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
  ],
} as const satisfies Module
