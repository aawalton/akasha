import type { ModelVersion } from "akasha/agent/model/version/model-version.page-type.types.ts"

export const claudeOpus551m = {
  id: "01a0d4b8-06a9-70de-b29c-41cc3846dd4b",
  type: "page-type/model-version",
  slug: "claude-opus-5-5-1m",
  title: "Opus 5.5 (1M context)",
  modelId: "claude-opus-5-5[1m]",
  modelFamily: "model-family/opus",
} as const satisfies ModelVersion
