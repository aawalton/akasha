import type { Command } from "../../../command.page-type.types.ts"

export const temperAutoQuestTrace = {
  id: "01a0603c-c1cb-7f65-8427-70fc0c00d3cf",
  pageTypeSlug: "command",
  type: "command",
  slug: "temper-auto-quest-trace",
  definition: "the command reading the auto-quest debug trace the quests addon captured",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--path <path>", takes: "the saved-variables file the trace is read from" },
    { said: "--json", takes: "give the whole trace as JSON rather than as text" },
  ],
  helpNotes: [
    "the path defaults to the quests addon's saved variables in the workstation's live game install.",
    "a capture the file does not hold is refused rather than read as an empty trace.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trace is read from the addon's saved variables.",
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
} as const satisfies Command
