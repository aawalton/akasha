import type { Module } from "@akasha/code-system/module"

export const pipelineConfigShaPinned = {
  id: "01a068e0-6ae3-72b3-8337-4a739343b4f0",
  pageTypeSlug: "module",
  slug: "pipeline-config-sha-pinned",
  definition: "every workflow config read at one commit rather than at the working tree",
  code: "ts",
} as const satisfies Module
