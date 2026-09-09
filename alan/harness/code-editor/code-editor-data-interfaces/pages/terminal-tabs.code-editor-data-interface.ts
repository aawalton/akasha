import type { CodeEditorDataInterface } from "../code-editor-data-interface.page-type.types.ts"

export const terminalTabs = {
  id: "01a07235-8d0b-7801-8413-863a7895f0da",
  pageTypeSlug: "code-editor-data-interface",
  type: "code-editor-data-interface",
  slug: "terminal-tabs",
  definition: "the name and color each terminal tab draws",
  d: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
