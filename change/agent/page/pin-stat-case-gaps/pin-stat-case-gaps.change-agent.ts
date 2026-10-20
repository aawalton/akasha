import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const pinStatCaseGaps = {
  id: "01a15b07-0fa7-733e-b5ea-13e6a8cd3e81",
  type: "page-type/change-agent",
  slug: "pin-stat-case-gaps",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one stat each named stat case keeps as a gap, pinned at the game's number",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The stat and the cases are handed in, one case slug to a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gap moves among the pinned stats in order, with the number the game showed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeping no gap for that stat is refused, and so is a slug naming no case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether the calculator gives the number is judged by the stat-case test.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-20T20:35:51.846Z",
  updatedAt: "2026-10-20T20:35:51.846Z",
} as const satisfies ChangeAgent
