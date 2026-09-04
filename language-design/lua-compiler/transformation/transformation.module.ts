import type { Module } from "@akasha/code-system/module"

export const transformation = {
  id: "01a06758-8e72-7000-a9f6-31e417bb363d",
  pageTypeSlug: "module",
  slug: "transformation",
  definition: "the Lua file and diagnostics a TypeScript source file transforms into",
  code: "ts",
} as const satisfies Module
