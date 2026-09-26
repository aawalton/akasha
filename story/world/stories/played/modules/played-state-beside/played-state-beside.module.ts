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
      statement: "What these pages hold is drawn over the state the story's game keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What these pages do not hold is drawn from the state the game keeps.",
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
      statement: "A skill is named by its skill page's title and ranked by its rank page's title.",
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
