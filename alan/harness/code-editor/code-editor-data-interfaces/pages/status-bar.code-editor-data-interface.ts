import type { CodeEditorDataInterface } from "../code-editor-data-interface.page-type.ts"

export const statusBar = {
  id: "01a07235-8d0a-7f23-8c72-807f542d4cef",
  pageTypeSlug: "code-editor-data-interface",
  slug: "status-bar",
  definition: "the slots the status bar draws",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
