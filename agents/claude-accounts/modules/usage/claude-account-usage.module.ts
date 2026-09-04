import type { Module } from "@akasha/code-system/module"

export const claudeAccountUsage = {
  id: "01a069cf-7042-7002-be6e-85399cf7d1f7",
  pageTypeSlug: "module",
  slug: "claude-account-usage",
  definition: "what the fleet of claude accounts has spent, read off the account pages",
  code: "ts",
} as const satisfies Module
