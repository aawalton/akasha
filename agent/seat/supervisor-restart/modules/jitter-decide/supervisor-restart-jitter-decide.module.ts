import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorRestartJitterDecide = {
  id: "01a06876-abda-7011-9a1d-2d00377d8021",
  type: "page-type/module",
  slug: "supervisor-restart-jitter-decide",
  definition: "the jitter a re-exec waits, so supervisors do not restart together",
  code: "ts",
} as const satisfies Module
