import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addStatCaseStats = {
  id: "01a15ca0-e8fc-748c-ac53-c96378c6d167",
  type: "page-type/change-agent",
  slug: "add-stat-case-stats",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "stats a stat case does not hold yet, added at the number its reading's sheet shows",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The stats are handed in one to a line, and the cases the same way or not at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming no case reaches every stat case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case's number is read from the advanced sheet of the reading it was pinned from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case's reading is the one captured at its second on its bar, whatever its hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat the estimate reproduces is pinned, and any other is kept as a gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stat the case holds, a sheet lacking its row and a reading not found leave a case as it is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 2048,
  createdAt: "2026-10-21T04:03:31.707Z",
  updatedAt: "2026-10-21T04:06:58.814Z",
} as const satisfies ChangeAgent
