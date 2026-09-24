import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorRestartState = {
  id: "01a06876-abda-7013-90bf-288dd9d45a60",
  type: "page-type/module",
  slug: "supervisor-restart-state",
  definition: "what the supervisor has about its own restart while it heals itself",
  code: "ts",
} as const satisfies Module
