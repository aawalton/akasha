import type { Module } from "@akasha/code-system/module"

export const containerRuntime = {
  id: "01a068dd-71dc-7136-bc3f-4fcb26a3ffe0",
  pageTypeSlug: "module",
  slug: "container-runtime",
  definition: "which container runtime this machine has",
  code: "ts",
} as const satisfies Module
