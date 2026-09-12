import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const reservedSlugs = {
  id: "01a05bd6-c535-7787-beb7-48e8d9debfaa",
  type: "module",
  slug: "reserved-slugs",
  definition: "the slugs no page may take",
  code: "ts",
} as const satisfies Module
