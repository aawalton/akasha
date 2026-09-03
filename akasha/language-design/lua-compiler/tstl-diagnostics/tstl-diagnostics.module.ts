import type { Module } from "@akasha/code-system/module"

export const tstlDiagnostics = {
  id: "01a06758-8e77-7000-98ce-6aa65ff839a9",
  pageTypeSlug: "module",
  slug: "tstl-diagnostics",
  definition: "the error and warning messages a TypeScript-to-Lua transformation raises",
  code: "ts",
} as const satisfies Module
