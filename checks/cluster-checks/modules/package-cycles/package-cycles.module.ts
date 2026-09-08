import type { Module } from "@akasha/code/module"

export const packageCycles = {
  id: "01a08173-3f05-79aa-b5d9-79e9d9237f8e",
  pageTypeSlug: "module",
  slug: "package-cycles",
  definition: "the groups of workspace packages that depend on one another in a ring",
  code: "ts",
} as const satisfies Module
