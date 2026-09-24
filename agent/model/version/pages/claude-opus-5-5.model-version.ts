import type { ModelVersion } from "akasha/agent/model/version/model-version.page-type.types.ts"

export const claudeOpus55 = {
  id: "01a0d4b8-0df0-75c7-b838-441974dcc766",
  type: "page-type/model-version",
  slug: "claude-opus-5-5",
  title: "Opus 5.5",
  modelId: "claude-opus-5-5",
  modelFamily: "model-family/opus",
} as const satisfies ModelVersion
