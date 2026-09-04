import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const sopsDecrypt = {
  id: "01a06f10-7000-7011-b0011-9d4a2f6c0011e1",
  pageTypeSlug: "module",
  slug: "sops-decrypt",
  definition: "a step decrypting a sops file and applying what it holds",
  code: "ts",
} as const satisfies Module
