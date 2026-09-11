import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const s3Multipart = {
  id: "01a05cbb-13a0-7d83-995d-4f53d2a329f6",
  type: "module",
  slug: "s3-multipart",
  definition: "a large object put into an S3 bucket as numbered parts",
  code: "ts",
} as const satisfies Module
