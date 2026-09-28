import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const timePanel = {
  id: "01a0e801-8867-7296-b587-5a6ffa7b65ec",
  type: "page-type/module",
  slug: "time-panel",
  definition: "the in-game time of a story played and the appointments still to come in it",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The in-game time drawn is the time the latest turn at player ends at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The appointments still to come with the story's character are listed under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No panel is drawn where there is no in-game time and no appointment to come.",
    },
  ],
} as const satisfies Module
