import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treasurePort = {
  id: "01a11cf8-29b7-71b6-8a8f-d1bb88c62929",
  type: "page-type/module",
  slug: "treasure-port",
  definition:
    "the port the treasure keybind makes, from a treasure's spot to the nearest travel point",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The spots are the ones Lost Treasure ships and the ones it learned from digs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of an item's spots, the one whose nearest travel point is closest is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a spot's map has no travel point, the map zooms out as the quest port's does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The map goes back to the player's own location once the spot is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing ports while the player is in combat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every press is written down, from the item it read to the line it said.",
    },
  ],
  createdAt: "2026-10-08T19:23:08.087Z",
  updatedAt: "2026-10-08T19:23:08.087Z",
} as const satisfies Module
