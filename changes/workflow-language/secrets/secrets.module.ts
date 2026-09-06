import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const secrets = {
  id: "01a07740-d031-75a3-93a1-a739f897985a",
  pageTypeSlug: "module",
  slug: "secrets",
  definition: "the secret names a step may mount, and a reference to one of them",
  code: "ts",
} as const satisfies Module
