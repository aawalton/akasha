import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorRestartJitterRule = {
  id: "01a06876-abda-7012-81f4-c00fe99b761f",
  type: "page-type/module",
  slug: "supervisor-restart-jitter-rule",
  definition: "asking how long a re-exec's jitter is",
  code: "ts",
} as const satisfies Module
