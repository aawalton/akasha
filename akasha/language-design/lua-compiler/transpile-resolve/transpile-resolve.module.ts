import type { Module } from "@akasha/code-system/module"

export const transpileResolve = {
  id: "01a06758-8ed8-7000-b0b0-0cb2ec818c07",
  pageTypeSlug: "module",
  slug: "transpile-resolve",
  definition: "the set of Lua files reached by following every require from the printed output",
  code: "ts",
} as const satisfies Module
