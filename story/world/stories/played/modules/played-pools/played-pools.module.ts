import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedPools = {
  id: "01a0f1df-ecb4-7c7a-b5e6-4a4c6b25d5e9",
  type: "page-type/module",
  slug: "played-pools",
  definition: "the pools a story played's hud draws, read off its resource rows and histories",
  code: "ts",
  test: "ts",
  decisions: [
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
      statement: "A resource stating the words the story gave for it is in no pool.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store, so what is handed in is all that is read.",
    },
  ],
} as const satisfies Module
