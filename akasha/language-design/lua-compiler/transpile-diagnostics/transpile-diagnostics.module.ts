import type { Module } from "@akasha/code-system/module"

export const transpileDiagnostics = {
  id: "01a06758-8ed0-7001-8afe-31c1c41ad19f",
  pageTypeSlug: "module",
  slug: "transpile-diagnostics",
  definition: "the diagnostic messages raised during module resolution and emit",
  code: "ts",
} as const satisfies Module
