import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackTopicWords = {
  id: "01a0ca3d-3f9d-7bc5-8a46-b199902bf3ac",
  type: "page-type/command",
  slug: "track-topic-words",
  definition: "the command counting one day's wisdom words and intelligence topics again",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both counts are worked out for the day named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count that threw is refused as the machine's fault.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out which day a call meant.",
    },
  ],
  name: "topic-words",
  arguments: [{ argument: "argument/day", required: true }],
} as const satisfies Command
