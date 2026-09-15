import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperAutoQuestTrace = {
  id: "01a0603c-c1cb-7f65-8427-70fc0c00d3cf",
  type: "command",
  slug: "temper-auto-quest-trace",
  definition: "the command reading the auto-quest debug trace the quests addon captured",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The trace is read from the addon's saved variables.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call naming no path reads the quests addon's capture in the game's live saved variables.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file with no trace refuses the call.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  name: "auto-quest-trace",
  arguments: [{ argument: "argument/json" }, { argument: "argument/quest-trace-path" }],
} as const satisfies Command
