import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const findingTree = {
  id: "01a0b733-1333-7afc-bb17-0a2d7e704c22",
  type: "page-type/code-editor-data-interface",
  slug: "finding-tree",
  definition: "the rows the findings panel draws",
  code: "ts",
  cooldownMilliseconds: 1000,
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
} as const satisfies CodeEditorDataInterface
