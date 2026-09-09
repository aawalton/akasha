import type { Module } from "@akasha/code/module"

export const cliDiagnostics = {
  id: "01a06758-8e63-7000-a20b-5a2f636104fd",
  pageTypeSlug: "module",
  type: "module",
  slug: "cli-diagnostics",
  definition: "the diagnostic messages the compiler raises for bad or misplaced compiler options",
  code: "ts",
} as const satisfies Module
