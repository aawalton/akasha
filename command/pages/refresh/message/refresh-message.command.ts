import type { Command } from "akasha/command/command.page-type.types.ts"

export const refreshMessage = {
  id: "01a082fe-341d-7593-8cfd-8216a7e94c2c",
  type: "command",
  slug: "refresh-message",
  definition: "the command counting again what Alan wrote each persona on each day",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The counts are what the transcripts say rather than what was kept before.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day the transcripts say nothing about keeps the counts it already had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A date no day page is filed under is said rather than kept against no day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that counted no day at all is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run turns no count into points.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run writes no value the commit has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run that stopped part way is refused naming each day counted before it stopped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that stopped before it counted a day is refused as the fault alone.",
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
  name: "message",
  arguments: [],
} as const satisfies Command
