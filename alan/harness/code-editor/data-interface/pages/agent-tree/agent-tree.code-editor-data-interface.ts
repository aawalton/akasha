import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const agentTree = {
  id: "01a07235-8d06-77ec-aa88-9d85e01587d8",
  type: "page-type/code-editor-data-interface",
  slug: "agent-tree",
  definition: "the rows the agents panel draws",
  d: "ts",
  code: "ts",
  cooldownMilliseconds: 1000,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is the top row, a seat, or a subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's children are rows of any kind.",
    },
  ],
} as const satisfies CodeEditorDataInterface
