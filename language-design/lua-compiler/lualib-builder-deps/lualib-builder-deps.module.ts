import type { Module } from "@akasha/code/module"

export const lualibBuilderDeps = {
  id: "01a06758-8e5b-7001-ac55-2bfb4f3318a0",
  pageTypeSlug: "module",
  type: "module",
  slug: "lualib-builder-deps",
  definition: "the mutable slots the printer and transpiler constructors are registered in",
  code: "ts",
} as const satisfies Module
