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
      statement: "Each status but player names the one role a turn waits on there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn waits on the roleplay seat at world-builder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn waits on the roleplay-recorder at game-master and writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn waits on the role any turn waits on at every other status.",
    },
  ],
  createdAt: "2026-10-17T17:12:36.732Z",
  updatedAt: "2026-10-17T17:54:51.718Z",
} as const satisfies Module
