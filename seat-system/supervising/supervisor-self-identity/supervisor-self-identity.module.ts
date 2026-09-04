import type { Module } from "@akasha/code-system/module"

export const supervisorSelfIdentity = {
  id: "01a06876-abda-7015-b513-59a7d4a87a69",
  pageTypeSlug: "module",
  slug: "supervisor-self-identity",
  definition: "the agent id the supervisor acts under, held so it can change",
  code: "ts",
} as const satisfies Module
