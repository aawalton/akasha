import type { Module } from "@akasha/code-system/module"

export const tstlWorkspaceSource = {
  id: "01a06758-8e97-7001-a2ca-381d3510aa50",
  pageTypeSlug: "module",
  slug: "tstl-workspace-source",
  definition: "whether a file's real path lies outside node_modules",
  code: "ts",
} as const satisfies Module
