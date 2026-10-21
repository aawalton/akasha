import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const pinTooltipCaseGaps = {
  id: "01a15c22-e9f4-72f2-acfc-3493433b213f",
  type: "page-type/change-agent",
  slug: "pin-tooltip-case-gaps",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one tooltip number tooltip cases keep as a gap, pinned at the game's number",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The number is handed in as its skill's ability id and placeholder, as `1 <<2>>`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cases may be handed in, one case slug to a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With no cases handed in, every tooltip case keeping that gap is changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The gap moves among the pinned numbers in order, with the number the game showed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case named keeping no gap for that number is refused, and so is a slug naming no case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether the tooltip formula gives the number is judged by the tooltip-case test.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-21T01:45:54.419Z",
  updatedAt: "2026-10-21T01:45:54.419Z",
} as const satisfies ChangeAgent
