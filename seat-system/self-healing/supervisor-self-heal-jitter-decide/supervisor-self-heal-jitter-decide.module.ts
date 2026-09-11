import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const supervisorSelfHealJitterDecide = {
  id: "01a06876-abda-7011-9a1d-2d00377d8021",
  type: "module",
  slug: "supervisor-self-heal-jitter-decide",
  definition: "the jitter a re-exec waits, so supervisors do not restart together",
  code: "ts",
} as const satisfies Module
