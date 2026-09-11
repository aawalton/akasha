import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interfaces/code-editor-data-interface.page-type.types.ts"

export const workTree = {
  id: "01a07235-8d09-7b14-8466-1f484c7d3657",
  pageTypeSlug: "code-editor-data-interface",
  type: "code-editor-data-interface",
  slug: "work-tree",
  definition: "the rows the work panel draws",
  d: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
