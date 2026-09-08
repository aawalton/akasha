import type { Module } from "@akasha/code/module"

export const functionalTypePurityAllowlist = {
  id: "01a0816b-9701-7b83-9ca7-2ebbe0009097",
  pageTypeSlug: "module",
  slug: "functional-type-purity-allowlist",
  definition:
    "the workspace dependencies a pure package may name where every import of them is type-only",
  code: "ts",
} as const satisfies Module
