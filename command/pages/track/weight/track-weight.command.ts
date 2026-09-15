import type { Command } from "akasha/command/command.page-type.types.ts"

export const trackWeight = {
  id: "01a07bfe-36da-7166-8f06-6fa75c6f8c29",
  type: "page-type/command",
  slug: "track-weight",
  definition: "the command recording what Alan's body weighed on a day",
  code: "ts",
  test: "ts",

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day has the weight measured on that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight is written in pounds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight a day already has is replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight that reads as no number is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight at or below nothing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is named at `--day`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no day acts on the US Mountain day.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no page is written before the weight goes onto that day.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the weight onto Alan's person page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write that threw is refused as the machine's fault.",
    },
  ],
  name: "weight",
  arguments: [{ argument: "argument/day" }, { argument: "argument/bodyweight", required: true }],
} as const satisfies Command
