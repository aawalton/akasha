import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const readerCharTable = {
  id: "01a05c3d-a2e7-7441-80a9-5e6d74c6fadb",
  type: "module",
  slug: "reader-char-table",
  definition:
    "Converts between a prose block position and a fraction of the whole body's characters.",
  code: "ts",
} as const satisfies Module
