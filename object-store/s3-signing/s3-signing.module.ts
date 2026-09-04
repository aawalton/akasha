import type { Module } from "../../code-system/modules/module.page-type.ts"

export const s3Signing = {
  id: "01a05cbb-139f-7e3b-82b4-28ff6d535d46",
  pageTypeSlug: "module",
  slug: "s3-signing",
  definition: "the authorization headers an S3 request is signed with",
  code: "ts",
} as const satisfies Module
