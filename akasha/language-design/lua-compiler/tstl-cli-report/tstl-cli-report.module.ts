import type { Module } from "@akasha/code-system/module"

export const tstlCliReport = {
  id: "01a06758-8e66-7001-be83-68bc7e318016",
  pageTypeSlug: "module",
  slug: "tstl-cli-report",
  definition: "a diagnostic reporter marking tstl's own diagnostics with the code TL",
  code: "ts",
} as const satisfies Module
