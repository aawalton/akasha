import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperSetTextCompare = {
  id: "01a164ad-5cb5-7d49-ae8c-9da9931099d8",
  type: "page-type/command",
  slug: "temper-set-text-compare",
  definition:
    "the command naming each set line the game showed that the catalog's lines disagree with",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines are every set line on every character's readings, each once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line agrees as the set text agreement module judges it agrees.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each line that disagrees is set beside the catalog's lines for its set and count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer counts the lines read and the lines that disagree.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game or writes a page.",
    },
  ],
  name: "set-text-compare",
  arguments: [{ argument: "argument/json" }],
  createdAt: "2026-10-22T17:34:05.492Z",
  updatedAt: "2026-10-22T17:34:05.492Z",
} as const satisfies Command
