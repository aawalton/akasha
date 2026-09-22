import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const appendLinesFrom = {
  id: "01a09312-fac0-7cab-bb6c-b8e6116903b3",
  type: "page-type/change-agent",
  slug: "append-lines-from",
  changeMode: "change-mode/change-mode-append",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "content a path holds, put at the end of what another path holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is read off a path the tree holds rather than handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An argument this change was handed no value for is refused by that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the tree holds no text at is refused.",
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
      decisionKind: "decision-kind/stopgap",
      statement: "This change goes once the entries it carries have landed.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
