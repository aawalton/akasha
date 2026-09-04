import type { Module } from "@akasha/code-system/module"

export const retryDeciding = {
  id: "01a068d9-1a58-7e75-84a0-3e6f9b17687b",
  pageTypeSlug: "module",
  slug: "retry-deciding",
  definition: "which steps a retry puts back, or why the retry is refused",
  code: "ts",
} as const satisfies Module
