import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildHashBase64url = {
  id: "01a062c4-780d-7083-93ab-7c7fe4743f20",
  pageTypeSlug: "module",
  slug: "build-hash-base64url",
  definition: "the sixty-four characters a byte array is carried by, safe inside a URL",
  code: "ts",
} as const satisfies Module
