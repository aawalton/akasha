import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const driveAuth = {
  id: "01a05bec-fc0b-7294-a122-83a7468eb160",
  type: "page-type/module",
  slug: "drive-auth",
  definition: "a Drive call's OAuth client",
  code: "ts",
} as const satisfies Module
