import type { Module } from "@akasha/code-system/module"

export const astGrepRules = {
  id: "01a06890-2000-7000-9000-000000000006",
  pageTypeSlug: "module",
  slug: "ast-grep-rules",
  definition:
    "the declared ast-grep patterns, the files they are declared in, and the entities they walk",
  code: "ts",
} as const satisfies Module
