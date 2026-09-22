import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const cliTsconfig = {
  id: "01a06758-8e67-7000-a91b-315144a7dcab",
  type: "page-type/module",
  slug: "cli-tsconfig",
  definition:
    "a tsconfig.json taken as compiler options, including those inherited through extends",
  code: "ts",
} as const satisfies Module
