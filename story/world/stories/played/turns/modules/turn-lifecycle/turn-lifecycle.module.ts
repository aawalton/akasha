import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnLifecycle = {
  id: "01a0dec2-87a0-7072-b427-5155e34684b0",
  type: "page-type/module",
  slug: "turn-lifecycle",
  definition: "the statuses a played turn or written chapter moves through",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is made only once the turn before it reaches player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn is told once its prose lands, and the next turn may follow it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's slug is the one before it with its last number one higher, as padded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice of a turn names its path and its status, and nothing of its content.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "A notice also names each lore page its seat read that has changed since, by path alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice names no lore page withheld from its seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A notice moving a turn to game-master names the player's intent for the character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn a narrator makes is said to be written by her, whatever its step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stall in a turn a narrator makes names no step and no seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Feedback on a turn reaches its narrator, or the game master where none narrates.",
    },
  ],
  createdAt: "2026-09-26T17:28:05.792Z",
  updatedAt: "2026-10-17T18:23:12.223Z",
} as const satisfies Module
