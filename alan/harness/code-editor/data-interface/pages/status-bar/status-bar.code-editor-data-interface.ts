import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const statusBar = {
  id: "01a07235-8d0a-7f23-8c72-807f542d4cef",
  type: "page-type/code-editor-data-interface",
  slug: "status-bar",
  definition: "the slots the status bar draws",
  d: "ts",
  code: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
