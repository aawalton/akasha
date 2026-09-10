import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const cliRun = {
  id: "01a06758-8e69-7000-9176-c0074cc6e7d9",
  pageTypeSlug: "module",
  type: "module",
  slug: "cli-run",
  definition: "the compiler's command line program, run once or in watch mode",
  code: "ts",
} as const satisfies Module
