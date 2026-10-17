import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnSeats = {
  id: "01a0e30b-7f83-7984-9180-2a2282b3cf3d",
  type: "page-type/module",
  slug: "turn-seats",
  definition: "the names of the seats a played turn reaches",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game's seats are named for the game master's persona, their role and the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story's coordinator seat is a game master seat or a roleplay seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplay seat is named for its persona, its role and the story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice of a turn reaches the game master, world builder and writer seats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice of a roleplayed story's turn reaches its roleplay seat alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A coordinator seat spelling no persona is the only seat a notice reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A headless seat's flex is its page's place among its kind, sorted by slug.",
    },
  ],
  createdAt: "2026-09-27T13:26:16.707Z",
  updatedAt: "2026-10-17T19:48:08.090Z",
} as const satisfies Module
