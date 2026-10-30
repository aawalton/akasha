import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnWaiting = {
  id: "01a14ad9-e67e-7b5e-88b6-eea2aa0e3fbc",
  type: "page-type/module",
  slug: "turn-waiting",
  definition: "the role whose seat a played turn or written chapter waits on at its status",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each status but beats and player names the one role a turn waits on there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn at beats waits on its game's game master, writer, recorder and reviewer seats together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the seat whose role the turn's status names advances the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A roleplayed turn waits on the roleplay seat at world-builder and at game-master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A roleplayed turn waits on the roleplay-recorder at every status after game-master but player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A one-seat story's turn waits on its game master seat at every status but player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn at player owing its memory waits on the memory recorder for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "In a one-seat story that is its game master seat.",
    },
  ],
  createdAt: "2026-10-17T17:12:36.732Z",
  updatedAt: "2026-10-30T15:23:27.205Z",
} as const satisfies Module
