import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedStateBeside = {
  id: "01a0de4c-3554-7639-96b1-340c959aae40",
  type: "page-type/module",
  slug: "played-state-beside",
  definition: "the state a story played draws, read off its character player's own pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The state drawn is what these pages hold and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character whose pages hold nothing has no state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool is keyed by the slug of its page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The most a pool holds is keyed by the pool's key with `Max` on the end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pool's change is its history's last line less the line before, where the last line is this turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool whose history has no line for this turn has no change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each part of the state is read through the world page type every story's own type extends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pools are the character's resources, and the level and attributes are its other numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skills, quests, bonds, attunements and items drawn are the pages naming the character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every part is narrowed to the character by the store rather than by this reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read is asked again as the story's last turn changes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
