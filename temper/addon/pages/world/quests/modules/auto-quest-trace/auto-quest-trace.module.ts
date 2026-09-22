import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const autoQuestTrace = {
  id: "01a06098-98a3-7c4d-b67f-e657dc450ff5",
  type: "page-type/module",
  slug: "auto-quest-trace",
  definition: "the dialogue choices the quests feature made, read back and checked",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trace is read here outside the game rather than inside the game.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No game function is called here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry declares its kind before anything else in that entry is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry with a field its kind never names is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved-variables table carrying a field beyond the trace is kept as found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trace the addon never wrote reads back as no entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A moment here is the second count the addon wrote.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
