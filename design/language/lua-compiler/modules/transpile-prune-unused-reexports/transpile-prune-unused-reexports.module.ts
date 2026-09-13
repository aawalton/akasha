import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const transpilePruneUnusedReexports = {
  id: "01a06758-8ed4-7002-8ac7-58ee4df05c7f",
  type: "module",
  slug: "transpile-prune-unused-reexports",
  definition: "the rewritten source file with unreached re-export declarations removed",
  code: "ts",
} as const satisfies Module
