import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interface/code-editor-data-interface.page-type.types.ts"

export const serviceTree = {
  id: "01a09baf-7e2d-7f8c-8a5e-ccb539d159b6",
  type: "page-type/code-editor-data-interface",
  slug: "service-tree",
  definition: "the rows the services panel draws",
  d: "ts",
  code: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
