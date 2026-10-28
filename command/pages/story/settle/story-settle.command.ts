import type { Command } from "akasha/command/command.page-type.types.ts"

export const storySettle = {
  id: "01a0de28-48fb-7823-9024-31f713cc562f",
  type: "page-type/command",
  slug: "story-settle",
  definition: "the command settling a declared action of a played story by a check",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  parts: [
    "module/settle-taking",
    "module/settling-finding",
    "module/settle-timing",
    "module/settle-acting",
  ],
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
      statement: "A story's time reading starts where its turn starts, as settle-timing says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roll is rolled from the seed the settle-seeding module makes for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The line before a roll is the last outcome on the latest turn at or before its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no open turn has one, it is the last outcome of the latest closed chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The step a turn is at does not change which outcomes a roll is chained from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No two rolls of one story are seeded alike.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "No call hands in the seed a roll is rolled from.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A check's code is handed the roll's total and never the dice, so it cannot refuse the wrong dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A settled roll is told with the seed it was rolled from, as its line records it.",
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
      statement: "What the check's code names as added is kept on the line as `added` and told.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No settling writes a page; the recorders at mechanics state each `added` as a change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer adding to a page that is not here is refused and appends nothing.",
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
      statement:
        "A reading's `character` that names no page by its one address is refused and appends nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second such settling is refused and appends nothing, unless at game-master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A second such settling on a turn at game-master appends a line replacing the line before.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A settling replacing a line is told which line it replaces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roll after a replacing line is chained from that line, as from any line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting call keeps its line beside the calling agent and commits nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting call reads the outcomes as the calling agent's kept edits leave them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting call finds a page its answer adds to as those kept edits leave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A landing call adding to a page only the caller's kept edits hold says to draft or land it first.",
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
  createdAt: "2026-09-26T14:39:37.211Z",
  updatedAt: "2026-10-28T17:47:18.985Z",
} as const satisfies Command
