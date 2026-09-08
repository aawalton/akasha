import type { Module } from "@akasha/code/module"

export const binModeViolations = {
  id: "01a0815c-f826-7b18-bbb9-d4869bf501e7",
  pageTypeSlug: "module",
  slug: "bin-mode-violations",
  definition: "the file mode on each command target a package manifest names",
  code: "ts",
} as const satisfies Module
