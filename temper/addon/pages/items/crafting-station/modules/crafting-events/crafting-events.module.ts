import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftingEvents = {
  id: "01a061c7-e876-7965-825f-15ded168bab6",
  type: "page-type/module",
  slug: "crafting-events",
  definition: "what the add-on does when the game says it has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "One Lua 5.1 function closes over no more than 60 locals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's events are listened for in a function apart from the load.",
    },
  ],
  createdAt: "2026-09-02T11:01:26.262Z",
  updatedAt: "2026-10-18T17:51:37.985Z",
} as const satisfies Module
