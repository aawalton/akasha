import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stripXmlComments = {
  id: "01a08de9-caf0-7416-9844-11646f6f4f04",
  type: "page-type/module",
  slug: "strip-xml-comments",
  definition: "markup with every comment blanked out and every line left where that line was",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A comment becomes blanks rather than going, so a position still names its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A newline inside a comment is kept, so a line number still names its line.",
    },
  ],
  createdAt: "2026-09-11T00:41:44.432Z",
  updatedAt: "2026-09-15T19:48:30.000Z",
} as const satisfies Module
