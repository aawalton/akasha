import type { Module } from "../../code-system/modules/module.page-type.ts"

export const narrowError = {
  id: "01a05c94-2c00-7694-aa59-6cd2bcfce2be",
  pageTypeSlug: "module",
  slug: "narrow-error",
  definition: "the error a narrowing throws when what it was given is not what it needs",
  code: "ts",
} as const satisfies Module
