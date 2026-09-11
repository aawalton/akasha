import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorWaitResume = {
  id: "01a06876-abda-701f-8a22-6cffb8f7fb91",
  type: "module",
  slug: "supervisor-wait-resume",
  definition: "watching a waiting seat and resuming it once its wait is over",
  code: "ts",
} as const satisfies Module
