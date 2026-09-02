import type { Module } from "../../code-system/modules/module.page-type.ts"

export const assertNever = {
  id: "01a05c94-2bfd-78f9-8078-7e672c919d08",
  pageTypeSlug: "module",
  slug: "assert-never",
  definition: "a variant no branch handled, refused where the code reaches it",
  code: "ts",
} as const satisfies Module
