import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const refusalTree = {
  id: "01a0d943-723d-7e6e-af8c-80ae7cbaf242",
  type: "page-type/code-editor-data-interface",
  slug: "refusal-tree",
  definition: "the rows the refusals panel draws",
  code: "ts",
  cooldownMilliseconds: 10000,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit watcher writes this picture each time the checkout's branch moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No landing draws this picture, since judging every definition takes seconds.",
    },
  ],
} as const satisfies CodeEditorDataInterface
