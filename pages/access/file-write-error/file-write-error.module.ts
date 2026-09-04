import type { Module } from "@akasha/code-system/module"

export const fileWriteError = {
  id: "01a05bd6-c531-7995-a7b4-e41806868a1b",
  pageTypeSlug: "module",
  slug: "file-write-error",
  definition: "the error a file-backed page write refuses with",
  code: "ts",
} as const satisfies Module
