import type { Module } from "@akasha/code-system/module"

export const supervisorLifecycle = {
  id: "01a0687c-0432-7000-adf7-33a3588b29b9",
  pageTypeSlug: "module",
  slug: "supervisor-lifecycle",
  definition: "shutting the supervisor down: the force-exit timer and the stopping order",
  code: "ts",
} as const satisfies Module
