import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inputsHash = {
  id: "01a07740-d031-75fd-8c46-8bdcc92c5a1b",
  pageTypeSlug: "module",
  type: "module",
  slug: "inputs-hash",
  definition: "a hash over a set of files, named as twelve lowercase hex",
  code: "ts",
} as const satisfies Module
