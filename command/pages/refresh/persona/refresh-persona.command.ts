import type { Command } from "akasha/command/command.page-type.types.ts"

export const refreshPersona = {
  id: "01a082e7-c8d0-7100-993a-5d7b2a70490d",
  type: "command",
  slug: "refresh-persona",
  definition: "the command working out again what each persona has earned",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rebuilding this asks for is the rebuilding the timer asks for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run adds up the counts the day pages carry rather than counting the transcripts again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that rebuilt no persona at all is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run works out no rung.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run works today's count out again from today's own rows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run that stopped part way is refused naming each persona rebuilt before it stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that stopped before it rebuilt a persona is refused as the fault alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call saying any word is refused, because this takes no argument.",
    },
  ],
  name: "persona",
  arguments: [],
} as const satisfies Command
