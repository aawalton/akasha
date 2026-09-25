import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const commandTree = {
  id: "01a07c93-52fe-76f9-9bea-127c9f9d5ad8",
  type: "page-type/code-editor-data-interface",
  slug: "command-tree",
  definition: "the rows the commands panel draws",
  d: "ts",
  code: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
