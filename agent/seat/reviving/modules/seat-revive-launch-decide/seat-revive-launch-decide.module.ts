import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatReviveLaunchDecide = {
  id: "01a0686d-9d5e-700b-a38f-fbe2284f5f2d",
  type: "page-type/module",
  slug: "seat-revive-launch-decide",
  definition: "whether a seat that is restarted keeps its Claude Code session",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no session to resume is spawned rather than revived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat being spawned falls back to its boot prompt where nothing else is stated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat being revived is handed no boot prompt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat being revived has already been booted once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a seat resuming a session needs its transcript materialised first.",
    },
  ],
  createdAt: "2026-09-03T18:00:09.310Z",
  updatedAt: "2026-10-30T14:39:35.872Z",
} as const satisfies Module
