import type { Module } from "@akasha/code-system/module"

export const pipelineConfigFileSet = {
  id: "01a068e0-6ae3-72e3-ae04-c5a66043514a",
  pageTypeSlug: "module",
  slug: "pipeline-config-file-set",
  definition: "the files one workflow watches, read out of the graph",
  code: "ts",
} as const satisfies Module
