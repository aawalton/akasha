import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const appendLines = {
  id: "01a08c38-a17c-70de-985a-a097e3dced7d",
  type: "page-type/change-agent",
  slug: "append-lines",
  changeMode: "change-mode/change-mode-append",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "content put at the end of what a path holds, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is handed in rather than read off a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument this change was handed no value for is refused by that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Answering the append is left to the partial this change runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the body the path holds.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
