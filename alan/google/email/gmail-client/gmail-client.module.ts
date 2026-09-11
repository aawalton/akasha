import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const gmailClient = {
  id: "01a05c0e-372e-7c82-9d8c-136a138d7b73",
  type: "module",
  slug: "gmail-client",
  definition: "the Gmail API bound to an authorised client",
  code: "ts",
} as const satisfies Module
