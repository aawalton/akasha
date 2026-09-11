import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const driveAuth = {
  id: "01a05bec-fc0b-7294-a122-83a7468eb160",
  type: "module",
  slug: "drive-auth",
  definition: "the OAuth client a Drive call is made through",
  code: "ts",
} as const satisfies Module
