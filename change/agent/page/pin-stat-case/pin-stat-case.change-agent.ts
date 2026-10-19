import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const pinStatCase = {
  id: "01a13b71-0505-7295-b80f-664bb22fb765",
  type: "page-type/change-agent",
  slug: "pin-stat-case",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "a stat case page, pinned from a character's latest reading of one bar",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The character is handed in by its page's slug, and the bar as front or back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The case is pinned from the reading that character's completion holds now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case handed no slug is named for its character, its bar and when it was read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug some case is named already is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading that records no game version is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-14T17:23:45.028Z",
  updatedAt: "2026-10-19T20:03:36.836Z",
} as const satisfies ChangeAgent
