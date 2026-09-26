import type { Command } from "akasha/command/command.page-type.types.ts"

export const storySettle = {
  id: "01a0de28-48fb-7823-9024-31f713cc562f",
  type: "page-type/command",
  slug: "story-settle",
  definition: "the command settling a declared action of a played story by rolling for a check",
  code: "ts",
  test: "ts",
  parts: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A roll is settled on the latest open turn of the story named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The dice are rolled here, and the caller hands in only the reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roll is seeded by the hash of the roll before it on the story's open turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A roll with no roll before it is seeded by the slug of the turn it is settled on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No call says the seed a roll is rolled from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roll is appended to the rolls beside its turn before its answer is told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check that refuses its reading appends nothing.",
    },
  ],
  name: "settle",
  arguments: [
    { argument: "argument/story", required: true },
    { argument: "argument/settled-check", required: true },
    { argument: "argument/reading", required: true },
    { argument: "argument/dice", required: true },
  ],
} as const satisfies Command
