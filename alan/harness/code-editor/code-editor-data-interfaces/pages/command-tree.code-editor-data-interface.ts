import type { CodeEditorDataInterface } from "../code-editor-data-interface.page-type.ts"

export const commandTree = {
  id: "01a07c93-52fe-76f9-9bea-127c9f9d5ad8",
  pageTypeSlug: "code-editor-data-interface",
  type: "code-editor-data-interface",
  slug: "command-tree",
  definition: "the rows the commands panel draws",
  d: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
