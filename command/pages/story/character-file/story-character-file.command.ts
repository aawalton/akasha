import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyCharacterFile = {
  id: "01a0b700-39f3-76fc-b703-ad293459d8ed",
  type: "page-type/command",
  slug: "story-character-file",
  definition:
    "the command filing a world's characters from what a reading of its chapters gathered",
  code: "ts",
  parts: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder of readings is named on the call rather than worked out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run writes every character the readings name rather than a chosen few.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run lands a batch at a time, and says the commit each batch made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch that refuses stops the run rather than being passed over.",
    },
  ],
  name: "character-file",
  arguments: [{ argument: "argument/readings-dir" }, { argument: "argument/batch" }],
} as const satisfies Command
