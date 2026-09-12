import type { Command } from "akasha/commands/command.page-type.types.ts"

export const refreshPersona = {
  id: "01a082e7-c8d0-7100-993a-5d7b2a70490d",
  type: "command",
  slug: "refresh-persona",
  definition: "the command working out again what each persona has earned",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rebuilding this asks for is the rebuilding the timer asks for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run adds up the counts the day pages carry rather than counting the transcripts again.",
    },
    {
      invariantKind: "departure",
      statement: "A run that rebuilt no persona at all is refused.",
    },
    {
      invariantKind: "absence",
      statement: "A run works out no rung.",
    },
    {
      invariantKind: "departure",
      statement: "A run works today's count out again from today's own rows.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run that stopped part way is refused naming each persona rebuilt before it stopped.",
    },
    {
      invariantKind: "departure",
      statement: "A run that stopped before it rebuilt a persona is refused as the fault alone.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "persona",
} as const satisfies Command
