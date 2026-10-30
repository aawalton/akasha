import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnRemembering = {
  id: "01a18d68-a265-7df0-b042-73b1918bc2c6",
  type: "page-type/module",
  slug: "turn-remembering",
  definition:
    "how a one-seat turn takes its memory, once for the whole turn, after it reaches player",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A one-seat turn at player owing its memory takes that memory in one advance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That advance comes from the game master seat, as the memory recorder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each memory line names its beat, and the advance names no `--beat`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat no line names is filled with an empty list, as a beat handed in empty is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The memory lands where a beat's memory lands, and the turn stays at player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its landing clears the turn's `memoryOwed`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture handed in there is refused, since a one-seat turn has no pictures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A one-seat beat refuses memory and pictures, so its beats are done by numbers and prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A one-seat beat's prose is refused until every beat's numbers are in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "So a numbers refusal is stated again before any prose is written.",
    },
  ],
  createdAt: "2026-10-30T15:23:27.205Z",
  updatedAt: "2026-10-30T15:38:23.605Z",
} as const satisfies Module
