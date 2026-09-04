import type { Module } from "@akasha/code-system/module"

export const parseInlineTokens = {
  id: "01a05c40-2195-7ad7-95be-2a30f075352e",
  pageTypeSlug: "module",
  slug: "parse-inline-tokens",
  definition:
    "Strips sigil-prefixed tokens from a title, returning the cleaned title and tokens per sigil.",
  code: "ts",
} as const satisfies Module
