import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const renameMetricReads = {
  id: "01a15c6c-e165-745a-8e17-b607ab5d82e4",
  type: "page-type/change-agent",
  slug: "rename-metric-reads",
  changeMode: "change-mode/change-mode-rename",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "every read of one metric in a folder's metric formulas pointed at another metric",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read is a metric named in a formula's list of metrics read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every metric formula under the folder named is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A metric named anywhere but a list of metrics read is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder whose formulas never read the metric is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks that the metric read instead exists.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-21T03:06:41.892Z",
  updatedAt: "2026-10-21T03:06:41.892Z",
} as const satisfies ChangeAgent
