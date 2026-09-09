import type { Module } from "@akasha/code/module"

export const transpilePlugins = {
  id: "01a06758-8ed4-7000-9c09-076ed2d9560a",
  pageTypeSlug: "module",
  type: "module",
  slug: "transpile-plugins",
  definition: "the compiler plugin interface of visitors, printer, and emit hooks",
  code: "ts",
} as const satisfies Module
