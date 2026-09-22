import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const dividePageProperty = {
  id: "01a08df3-43fc-70b7-b21c-a996acd3d268",
  type: "page-type/change-agent",
  slug: "divide-page-property",
  changeMode: "change-mode/change-mode-divide",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "a page property's rows laid out again across the files the ceiling takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page the rows sit beside is named by `at`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The property those rows are held in is named by `property`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handed no value for a key is refused by that key.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out where the files divide.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
