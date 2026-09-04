import type { Module } from "@akasha/code-system/module"

export const readProgress = {
  id: "01a05c3d-a2e5-7e5c-86bc-9dabc556a0d6",
  pageTypeSlug: "module",
  slug: "read-progress",
  definition: "Turns a scroll fraction into a word-count progress, returned only when it advances.",
  code: "ts",
} as const satisfies Module
