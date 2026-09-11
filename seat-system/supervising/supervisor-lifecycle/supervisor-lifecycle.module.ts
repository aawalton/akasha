import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const supervisorLifecycle = {
  id: "01a0687c-0432-7000-adf7-33a3588b29b9",
  pageTypeSlug: "module",
  type: "module",
  slug: "supervisor-lifecycle",
  definition: "shutting the supervisor down: the force-exit timer and the stopping order",
  code: "ts",
} as const satisfies Module
