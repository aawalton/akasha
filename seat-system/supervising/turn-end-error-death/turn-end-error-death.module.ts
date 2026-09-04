import type { Module } from "@akasha/code-system/module"

export const turnEndErrorDeath = {
  id: "01a069bf-f8d9-7001-82c3-8f6d8aac0f8b",
  pageTypeSlug: "module",
  slug: "turn-end-error-death",
  definition:
    "the run of api error statuses closing a transcript, which says a turn died rather than ended",
  code: "ts",
} as const satisfies Module
