import type { Module } from "@akasha/code/module"

export const tsconfigImportGraph = {
  id: "01a08183-b4fb-78a2-a1d2-56f1679fdb9f",
  pageTypeSlug: "module",
  slug: "tsconfig-import-graph",
  definition: "the workspaces a tsconfig references, and the pairs that reference one another",
  code: "ts",
} as const satisfies Module
