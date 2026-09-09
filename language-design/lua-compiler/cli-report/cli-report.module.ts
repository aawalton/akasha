import type { Module } from "@akasha/code/module"

export const cliReport = {
  id: "01a06758-8e66-7001-be83-68bc7e318016",
  pageTypeSlug: "module",
  type: "module",
  slug: "cli-report",
  definition: "a diagnostic reporter marking the compiler's own diagnostics with the code TL",
  code: "ts",
} as const satisfies Module
