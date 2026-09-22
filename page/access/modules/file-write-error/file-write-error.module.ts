import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileWriteError = {
  id: "01a05bd6-c531-7995-a7b4-e41806868a1b",
  type: "page-type/module",
  slug: "file-write-error",
  definition: "a file-backed page write's refusing error",
  code: "ts",
} as const satisfies Module
