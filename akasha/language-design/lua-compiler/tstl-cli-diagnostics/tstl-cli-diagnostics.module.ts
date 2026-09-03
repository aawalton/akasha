import type { Module } from "@akasha/code-system/module"

export const tstlCliDiagnostics = {
  id: "01a06758-8e63-7000-a20b-5a2f636104fd",
  pageTypeSlug: "module",
  slug: "tstl-cli-diagnostics",
  definition: "the diagnostic messages tstl raises for bad or misplaced compiler options",
  code: "ts",
} as const satisfies Module
