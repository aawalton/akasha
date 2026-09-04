import type { Module } from "@akasha/code-system/module"

export const supervisorSelfHealJitterRule = {
  id: "01a06876-abda-7012-81f4-c00fe99b761f",
  pageTypeSlug: "module",
  slug: "supervisor-self-heal-jitter-rule",
  definition: "asking how long a re-exec's jitter is",
  code: "ts",
} as const satisfies Module
