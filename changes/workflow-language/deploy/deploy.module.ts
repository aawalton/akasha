import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const deploy = {
  id: "01a06f10-7000-700a-b000a-9d4a2f6c000ae1",
  pageTypeSlug: "module",
  slug: "deploy",
  definition:
    "a step setting a deployment's image, verifying the rollout and undoing it on failure",
  code: "ts",
} as const satisfies Module
