import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnEndErrorDeath = {
  id: "01a069bf-f8d9-7001-82c3-8f6d8aac0f8b",
  type: "page-type/module",
  slug: "turn-end-error-death",
  definition:
    "the set of api error statuses closing a transcript, which says a turn died rather than ended",
  code: "ts",
} as const satisfies Module
