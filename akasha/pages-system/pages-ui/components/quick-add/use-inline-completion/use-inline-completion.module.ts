import type { Module } from "@akasha/code-system/module"

export const useInlineCompletion = {
  id: "01a05c40-2196-76a5-86e6-fa407ef6bfdd",
  pageTypeSlug: "module",
  slug: "use-inline-completion",
  definition:
    "Suggests and applies the most frequent candidate completion for the sigil token at the cursor.",
  code: "ts",
} as const satisfies Module
