import type { Module } from "@akasha/code-system/module"

export const fileWrite = {
  id: "01a05bd6-c531-7a9e-9505-89164f47be5f",
  pageTypeSlug: "module",
  slug: "file-write",
  definition: "a file-backed page created, patched, removed or upserted",
  code: "ts",
} as const satisfies Module
