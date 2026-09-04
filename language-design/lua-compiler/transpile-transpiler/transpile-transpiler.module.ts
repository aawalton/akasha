import type { Module } from "@akasha/code-system/module"

export const transpileTranspiler = {
  id: "01a06758-8edb-7000-8eee-12534ca2bb08",
  pageTypeSlug: "module",
  slug: "transpile-transpiler",
  definition: "the emit run of one program, from plugin loading to written files",
  code: "ts",
} as const satisfies Module
