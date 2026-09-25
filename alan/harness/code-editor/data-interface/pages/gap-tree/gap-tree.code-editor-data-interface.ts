import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const gapTree = {
  id: "01a0b7a0-c25d-74c1-b59f-75ee61fe417c",
  type: "page-type/code-editor-data-interface",
  slug: "gap-tree",
  definition: "the rows the gaps panel draws",
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
} as const satisfies CodeEditorDataInterface
