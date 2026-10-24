import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const copyPinnedReadings = {
  id: "01a16fd5-da9a-7c71-b6df-fdf2eaca7565",
  type: "page-type/change-agent",
  slug: "copy-pinned-readings",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "every combat case, with the reading it was pinned from copied beside it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A case's reading is the line its character's readings hold under the case's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line is copied whole, as the readings hold it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case already holding its reading is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case whose reading the readings no longer hold is named rather than skipped.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "This change goes once every case holds its reading.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-24T21:34:08.537Z",
  updatedAt: "2026-10-24T21:34:08.537Z",
} as const satisfies ChangeAgent
