import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const workspaceSource = {
  id: "01a06758-8e97-7001-a2ca-381d3510aa50",
  type: "module",
  slug: "workspace-source",
  definition: "whether a file's real path lies outside node_modules",
  code: "ts",
} as const satisfies Module
