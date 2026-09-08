import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const verifyRollout = {
  id: "01a07740-d031-78cb-9e6d-1202970669f7",
  pageTypeSlug: "module",
  slug: "verify-rollout",
  definition: "the shell line waiting on a deployment's rollout to finish",
  code: "ts",
} as const satisfies Module
