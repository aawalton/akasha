import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperAutoQuestTrace = {
  id: "01a0603c-c1cb-7f65-8427-70fc0c00d3cf",
  type: "page-type/command",
  slug: "temper-auto-quest-trace",
  definition: "the command reading the auto-quest debug trace the world add-on captured",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The trace is read from the add-on's saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call naming no path reads the world add-on's capture in the game's live saved variables.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file with no trace refuses the call.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  name: "auto-quest-trace",
  arguments: [{ argument: "argument/json" }, { argument: "argument/quest-trace-path" }],
} as const satisfies Command
