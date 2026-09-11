import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const jennyRingCredential = {
  id: "01a06558-c2cc-700e-a3eb-ad9e4f295d16",
  type: "module",
  slug: "jenny-ring-credential",
  definition:
    "the credential a caller into Jenny's ring presents, and the refusal of one without it",
  code: "ts",
} as const satisfies Module
