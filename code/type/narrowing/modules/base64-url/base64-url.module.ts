import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const base64Url = {
  id: "01a08dda-ba3d-7b5a-9512-e8a36162fba1",
  type: "page-type/module",
  slug: "base64-url",
  definition: "bytes or text written in base64 over the URL alphabet, carrying no padding",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text handed in is read as its UTF-8 bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Plus becomes minus and slash becomes underscore.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The padding base64 ends in is struck.",
    },
  ],
} as const satisfies Module
