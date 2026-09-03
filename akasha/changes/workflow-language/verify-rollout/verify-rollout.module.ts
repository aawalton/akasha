import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const verifyRollout = {
  id: "01a06f10-7000-7013-b0013-9d4a2f6c0013e1",
  pageTypeSlug: "module",
  slug: "verify-rollout",
  definition: "the shell line waiting on a deployment's rollout to finish",
  code: "ts",
} as const satisfies Module
