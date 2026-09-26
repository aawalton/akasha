import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const worldTree = {
  id: "01a0de0c-d6b7-7dbe-8f10-ce4f68fa4c98",
  type: "page-type/code-editor-data-interface",
  slug: "world-tree",
  definition: "the rows the worlds panel draws",
  code: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
