import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterMaking = {
  id: "01a0e96e-2932-7927-bb2d-8c23a95bf20f",
  type: "page-type/module",
  slug: "chapter-making",
  definition: "the next chapter of a written story, started at the world builder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter is started through the pages service, since the web server holds no index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is started only while no chapter of its story is being made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter is numbered one past the story's last, and its slug ends in that number padded to four.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is started with no prose and titled for its position.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter started tells the story's game master, world builder and writer seats of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter started of a story with editor steps tells its editor seats as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming no coordinator agent starts no chapter.",
    },
  ],
} as const satisfies Module
