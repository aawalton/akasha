import type { CodeEditorDataInterface } from "akasha/alan/harness/code-editor/data-interfaces/code-editor-data-interface.page-type.types.ts"

export const agentTree = {
  id: "01a07235-8d06-77ec-aa88-9d85e01587d8",
  pageTypeSlug: "code-editor-data-interface",
  type: "code-editor-data-interface",
  slug: "agent-tree",
  definition: "the rows the agents panel draws",
  d: "ts",
  cooldownMilliseconds: 1000,
} as const satisfies CodeEditorDataInterface
