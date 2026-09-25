import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const workTree = {
  id: "01a07235-8d09-7b14-8466-1f484c7d3657",
  type: "page-type/code-editor-data-interface",
  slug: "work-tree",
  definition: "the rows the work panel draws",
  d: "ts",
  code: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
