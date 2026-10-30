import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const findingTree = {
  id: "01a0b733-1333-7afc-bb17-0a2d7e704c22",
  type: "page-type/code-editor-data-interface",
  slug: "finding-tree",
  definition: "the rows the editor shows in its tree of findings",
  code: "ts",
  cooldownMilliseconds: 10000,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit watcher writes this picture each time the checkout's branch moves.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No landing draws this picture.",
    },
  ],
  createdAt: "2026-09-19T01:06:12.915Z",
  updatedAt: "2026-10-30T15:29:54.369Z",
} as const satisfies CodeEditorDataInterface
