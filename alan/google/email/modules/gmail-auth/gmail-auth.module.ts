import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailAuth = {
  id: "01a05c0e-372e-77e5-9829-8e3c9ce333ef",
  type: "page-type/module",
  slug: "gmail-auth",
  definition: "a Gmail call's OAuth client",
  code: "ts",
} as const satisfies Module
