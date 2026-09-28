import type { Command } from "akasha/command/command.page-type.types.ts"

export const storySettle = {
  id: "01a0de28-48fb-7823-9024-31f713cc562f",
  type: "page-type/command",
  slug: "story-settle",
  definition: "the command settling a declared action of a played story by a check",
  code: "ts",
  test: "ts",
  parts: ["module/settle-asking"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A roll is settled on the turn named, or else on the story's latest open turn.",
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
      statement: "A roll is appended to the outcomes beside its turn before its answer is told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer stating `endsAt` is stated on the turn in the same landing or draft.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check that refuses its reading appends nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check that rolls nothing is settled with no dice named and is handed no roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line settled with no dice states neither dice nor seed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check that rolls nothing settles once on a turn for each `character` its readings name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second such settling is refused and appends nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting call keeps its line beside the calling agent and commits nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting call reads the outcomes as the calling agent's kept edits leave them.",
    },
  ],
  name: "settle",
  arguments: [
    { argument: "argument/story", required: true },
    { argument: "argument/settled-check", required: true },
    { argument: "argument/reading", required: true },
    { argument: "argument/dice", required: false },
    { argument: "argument/played-turn", required: false },
    { argument: "argument/draft" },
  ],
} as const satisfies Command
