import type { Module } from "@akasha/code/module"

export const workspaceSource = {
  id: "01a06758-8e97-7001-a2ca-381d3510aa50",
  pageTypeSlug: "module",
  type: "module",
  slug: "workspace-source",
  definition: "whether a file's real path lies outside node_modules",
  code: "ts",
} as const satisfies Module
