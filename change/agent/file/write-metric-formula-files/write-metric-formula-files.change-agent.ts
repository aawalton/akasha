import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const writeMetricFormulaFiles = {
  id: "01a0df23-f4cf-7fd5-b486-0e66ece6f03c",
  type: "page-type/change-agent",
  slug: "write-metric-formula-files",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "every stat's formula file written again through the stat formula writer",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A formula file is read for its formula and written again whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A formula file the writer would write the same is left alone.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 120,
  maxMemoryMb: 2048,
} as const satisfies ChangeAgent
