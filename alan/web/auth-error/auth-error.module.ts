import type { Module } from "@akasha/code-system/module"

export const authError = {
  id: "01a0655d-daa6-78c9-a8e1-bdadc1e9ebed",
  pageTypeSlug: "module",
  slug: "auth-error",
  definition: "a thrown thing judged to be a sign-in that lapsed",
  code: "ts",
} as const satisfies Module
