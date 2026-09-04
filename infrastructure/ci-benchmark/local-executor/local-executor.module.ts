import type { Module } from "@akasha/code-system/module"

export const localExecutor = {
  id: "01a068dd-71dc-71bd-80dd-5f25b5fe78e6",
  pageTypeSlug: "module",
  slug: "local-executor",
  definition: "every step of a workflow run on this machine in order",
  code: "ts",
} as const satisfies Module
