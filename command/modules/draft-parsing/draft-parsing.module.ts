import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const draftParsing = {
  id: "01a0e404-187e-7a49-9de8-47bb3176205d",
  type: "page-type/module",
  slug: "draft-parsing",
  definition: "whether the TypeScript bodies a draft leaves still parse",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A draft leaving a TypeScript body that will not parse is refused, and nothing is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the path, the line and column, and what the parser expected.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the bodies the new edits touch are parsed, as every edit kept leaves them.",
    },
  ],
} as const satisfies Module
