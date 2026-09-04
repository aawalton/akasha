import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const driveClient = {
  id: "01a05bec-fc0b-77c1-a475-068ae3129c4a",
  pageTypeSlug: "module",
  slug: "drive-client",
  definition: "the Drive API bound to an authorised client",
  code: "ts",
} as const satisfies Module
