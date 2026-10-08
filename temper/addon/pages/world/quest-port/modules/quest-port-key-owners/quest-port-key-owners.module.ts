import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortKeyOwners = {
  id: "01a11c9f-2f5c-7ed3-9414-f0f8ab64a4f1",
  type: "page-type/module",
  slug: "quest-port-key-owners",
  definition: "every action the T key reaches and every key the next-quest move is bound to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A record is written three seconds after the player arrives in the world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record is written on each press of the port keybind and each next-quest move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record lists every action in every layer that has the T key, with modifiers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record lists every key the game's next-quest action is bound to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record names the active input layers and the action T reaches in each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record names the current scene and whether it is the base scene.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part of a record that throws is left out rather than losing the record.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here binds or unbinds a key.",
    },
  ],
  createdAt: "2026-10-08T17:45:56.828Z",
  updatedAt: "2026-10-08T17:45:56.828Z",
} as const satisfies Module
