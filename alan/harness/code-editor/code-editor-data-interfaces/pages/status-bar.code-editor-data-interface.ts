import type { CodeEditorDataInterface } from "../code-editor-data-interface.page-type.types.ts"

export const statusBar = {
  id: "01a07235-8d0a-7f23-8c72-807f542d4cef",
  pageTypeSlug: "code-editor-data-interface",
  type: "code-editor-data-interface",
  slug: "status-bar",
  definition: "the slots the status bar draws",
  d: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
