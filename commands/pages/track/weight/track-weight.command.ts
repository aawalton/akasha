import type { Command } from "akasha/commands/command.page-type.types.ts"

export const trackWeight = {
  id: "01a07bfe-36da-7166-8f06-6fa75c6f8c29",
  type: "command",
  slug: "track-weight",
  definition: "the command recording what Alan's body weighed on a day",
  code: "ts",
  test: "ts",
  taking: [],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A day has the weight measured on that day.",
    },
    {
      invariantKind: "departure",
      statement: "A weight is written in pounds.",
    },
    {
      invariantKind: "departure",
      statement: "A weight a day already has is replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A weight that reads as no number is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A weight at or below nothing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no day acts on the US Mountain day.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no page is written before the weight goes onto that day.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the weight onto Alan's person page.",
    },
    {
      invariantKind: "departure",
      statement: "A write that threw is refused as the machine's fault.",
    },
  ],
  name: "weight",
  arguments: [{ argument: "argument/day" }, { argument: "argument/bodyweight" }],
} as const satisfies Command
