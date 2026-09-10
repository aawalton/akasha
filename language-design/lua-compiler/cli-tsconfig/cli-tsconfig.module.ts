import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const cliTsconfig = {
  id: "01a06758-8e67-7000-a91b-315144a7dcab",
  pageTypeSlug: "module",
  type: "module",
  slug: "cli-tsconfig",
  definition: "a tsconfig.json read as compiler options, including those inherited through extends",
  code: "ts",
} as const satisfies Module
