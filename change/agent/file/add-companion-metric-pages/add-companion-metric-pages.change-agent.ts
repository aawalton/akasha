import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addCompanionMetricPages = {
  id: "01a0deff-4b81-74d0-9066-560c30b8eb81",
  type: "page-type/change-agent",
  slug: "add-companion-metric-pages",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "every companion stat and stat group the companion tables hold, written as pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each companion stat is a stat page whose subject is companion, with its formula beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The companion groups are stat tree pages under one companion root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This change goes once the companion tables it reads go.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 120,
  maxMemoryMb: 2048,
} as const satisfies ChangeAgent
