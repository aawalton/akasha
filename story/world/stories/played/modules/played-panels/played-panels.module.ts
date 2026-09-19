import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedPanels = {
  id: "01a0a163-2e7c-7f18-9a60-4d82b5e1c03f",
  type: "page-type/module",
  slug: "played-panels",
  definition: "the panels a played story's game asks for beside its run, its hud, quests and sheet",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel is drawn where the game beside the story asks for that panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel drawn over a state that went unread draws its own empty reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pools a hud bars are the pools the game's display names and no other.",
    },
  ],
} as const satisfies Module
