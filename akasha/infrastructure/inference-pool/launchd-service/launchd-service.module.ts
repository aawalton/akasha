import type { Module } from "@akasha/code-system/module"

export const launchdService = {
  id: "01a06815-9efd-7008-be4f-6b32ac78657e",
  pageTypeSlug: "module",
  slug: "launchd-service",
  definition: "a launchd job started, stopped or killed",
  code: "ts",
} as const satisfies Module
