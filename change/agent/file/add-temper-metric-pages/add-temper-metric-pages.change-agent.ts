import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addTemperMetricPages = {
  id: "01a0de64-e49f-75a7-88ae-5f38f14d686e",
  type: "page-type/change-agent",
  slug: "add-temper-metric-pages",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "every stat the stat table holds written as a page with its formula beside it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stat's page and formula are written from the table, and nothing by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat the table gives no formula has no formula file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asked for the tree titles, each metric node takes the name its stat has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This change goes once the stat table it reads goes.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 120,
  maxMemoryMb: 2048,
} as const satisfies ChangeAgent
