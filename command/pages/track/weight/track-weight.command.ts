import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackWeight = {
  id: "01a07bfe-36da-7166-8f06-6fa75c6f8c29",
  type: "command",
  slug: "track-weight",
  definition: "the command recording what Alan's body weighed on a day",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day has the weight measured on that day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A weight is written in pounds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A weight a day already has is replaced.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A weight that reads as no number is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A weight at or below nothing is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no day acts on the US Mountain day.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day with no page is written before the weight goes onto that day.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the weight onto Alan's person page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write that threw is refused as the machine's fault.",
    },
  ],
  name: "weight",
  arguments: [{ argument: "argument/day" }, { argument: "argument/bodyweight", required: true }],
} as const satisfies Command
