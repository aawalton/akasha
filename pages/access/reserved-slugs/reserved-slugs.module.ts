import type { Module } from "@akasha/code-system/module"

export const reservedSlugs = {
  id: "01a05bd6-c535-7787-beb7-48e8d9debfaa",
  pageTypeSlug: "module",
  slug: "reserved-slugs",
  definition: "the slugs no page may take",
  code: "ts",
} as const satisfies Module
