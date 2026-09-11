import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const transformDiagnostics = {
  id: "01a06758-8e77-7000-98ce-6aa65ff839a9",
  type: "module",
  slug: "transform-diagnostics",
  definition: "the error and warning messages a TypeScript-to-Lua transformation raises",
  code: "ts",
} as const satisfies Module
