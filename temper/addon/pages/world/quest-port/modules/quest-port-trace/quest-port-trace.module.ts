import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortTrace = {
  id: "01a11c7c-69d2-7678-9470-a390f3f3b142",
  type: "page-type/module",
  slug: "quest-port-trace",
  definition: "what one press of the port keybind saw and did, written down as the press goes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A press is written down the moment it starts, so a press that stops part way still shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The map is read again after every step that sets it or zooms it out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's whole answer about the objective is kept as the game gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every line the keybind says in chat is kept with the press that said it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A note that throws is dropped rather than reaching the keybind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Treasure port presses are kept in a list of their own beside the quest port's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A treasure press keeps the item it read, its slot and every spot known for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every position written down is also put on the whole world's scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A breadcrumb probe keeps the map it asked on and the game's whole answer there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A press that probed keeps where the player was on the player's own map.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here changes where the keybind ports.",
    },
  ],
  createdAt: "2026-10-08T17:07:58.033Z",
  updatedAt: "2026-10-10T13:55:00.117Z",
} as const satisfies Module
