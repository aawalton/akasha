import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const restateTooltipCases = {
  id: "01a15c86-2ec3-7c0f-8cb0-9befb7f76cab",
  type: "page-type/change-agent",
  slug: "restate-tooltip-cases",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "tooltip cases, each holding again what its build and reading held",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Cases may be handed in, one case slug to a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With no cases handed in, every tooltip case is restated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case's reading is the line of its character's readings on its bar, captured when it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case restated takes the passives, stars, medium pieces, weapons, buffs and points that line held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case restated takes each skill's duration from that line's skill of its ability id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case restated keeps its stats, tooltips, pinned numbers and gaps as they are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case whose reading is not found is refused, and so is a slug naming no case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether the tooltip formulas still give each pinned number is judged by the tooltip-case test.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 60,
  maxMemoryMb: 1024,
  createdAt: "2026-10-21T03:34:20.099Z",
  updatedAt: "2026-10-21T04:50:32.260Z",
} as const satisfies ChangeAgent
