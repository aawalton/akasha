import type { Module } from "@akasha/code-system/module"

export const supervisorRedeliveryHoldoff = {
  id: "01a06876-abda-7006-92e7-eb3df9fe91a5",
  pageTypeSlug: "module",
  slug: "supervisor-redelivery-holdoff",
  definition: "how long a claimed message waits before it may be delivered again",
  code: "ts",
} as const satisfies Module
