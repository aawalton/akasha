import type { CodeEditorDataInterface } from "../code-editor-data-interface.page-type.ts"

export const agentColors = {
  id: "01a07235-8d05-778a-90d4-01a9752d4c0b",
  pageTypeSlug: "code-editor-data-interface",
  slug: "agent-colors",
  definition: "the color each agent is drawn in",
  stateType: "ts",
  cooldownMilliseconds: 100,
} as const satisfies CodeEditorDataInterface
