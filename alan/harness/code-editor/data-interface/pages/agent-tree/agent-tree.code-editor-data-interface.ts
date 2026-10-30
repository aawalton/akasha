import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const agentTree = {
  id: "01a07235-8d06-77ec-aa88-9d85e01587d8",
  type: "page-type/code-editor-data-interface",
  slug: "agent-tree",
  definition: "the rows the editor shows in its tree of agents",
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
  createdAt: "2026-09-05T15:35:07.270Z",
  updatedAt: "2026-10-30T15:29:05.883Z",
} as const satisfies CodeEditorDataInterface
