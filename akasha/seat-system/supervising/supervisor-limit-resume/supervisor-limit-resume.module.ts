import type { Module } from "@akasha/code-system/module"

export const supervisorLimitResume = {
  id: "01a0687c-0430-7000-8a23-ad75e4f9c9b5",
  pageTypeSlug: "module",
  slug: "supervisor-limit-resume",
  definition: "watching a rate-limited seat and resuming it once its limit lifts",
  code: "ts",
} as const satisfies Module
