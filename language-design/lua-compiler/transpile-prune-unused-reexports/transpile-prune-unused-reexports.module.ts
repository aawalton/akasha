import type { Module } from "@akasha/code-system/module"

export const transpilePruneUnusedReexports = {
  id: "01a06758-8ed4-7002-8ac7-58ee4df05c7f",
  pageTypeSlug: "module",
  slug: "transpile-prune-unused-reexports",
  definition: "the rewritten source file with unreached re-export declarations removed",
  code: "ts",
} as const satisfies Module
