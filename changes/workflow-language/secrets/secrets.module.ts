import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const secrets = {
  id: "01a06f10-7000-7003-b0003-9d4a2f6c0003e1",
  pageTypeSlug: "module",
  slug: "secrets",
  definition: "the secret names a step may mount, and a reference to one of them",
  code: "ts",
} as const satisfies Module
