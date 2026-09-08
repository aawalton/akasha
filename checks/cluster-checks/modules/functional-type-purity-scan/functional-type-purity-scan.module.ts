import type { Module } from "@akasha/code/module"

export const functionalTypePurityScan = {
  id: "01a0816b-fbf8-7fc3-aa1d-f71340c132fc",
  pageTypeSlug: "module",
  slug: "functional-type-purity-scan",
  definition: "whether every source file in a workspace is free of node builtins and effect calls",
  code: "ts",
} as const satisfies Module
