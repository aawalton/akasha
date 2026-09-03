import type { Module } from "@akasha/code-system/module"

export const pipelineConfigLoading = {
  id: "01a068e0-6ae3-7be6-b734-eb5a03dcc580",
  pageTypeSlug: "module",
  slug: "pipeline-config-loading",
  definition: "every workflow config a commit holds, loaded and hashed",
  code: "ts",
} as const satisfies Module
