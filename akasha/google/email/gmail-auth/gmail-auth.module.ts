import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gmailAuth = {
  id: "01a05c0e-372e-77e5-9829-8e3c9ce333ef",
  pageTypeSlug: "module",
  slug: "gmail-auth",
  definition: "the OAuth client a Gmail call is made through",
  code: "ts",
} as const satisfies Module
