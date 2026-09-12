import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperAutoQuestTrace = {
  id: "01a0603c-c1cb-7f65-8427-70fc0c00d3cf",
  type: "command",
  slug: "temper-auto-quest-trace",
  definition: "the command reading the auto-quest debug trace the quests addon captured",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--path <path>", takes: "the saved-variables file the trace is read from" },
    { said: "--json", takes: "give the whole trace as JSON rather than as text" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trace is read from the addon's saved variables.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call naming no path reads the quests addon's capture in the game's live saved variables.",
    },
    {
      invariantKind: "departure",
      statement: "A file with no trace refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  name: "auto-quest-trace",
} as const satisfies Command
