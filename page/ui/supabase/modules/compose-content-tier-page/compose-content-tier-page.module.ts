import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeContentTierPage = {
  id: "01a05cb4-fefb-7dd3-9ebe-8960581aaa6d",
  type: "page-type/module",
  slug: "compose-content-tier-page",
  definition: "a page merged from what was fetched on demand and what the mirror has",
  code: "ts",
} as const satisfies Module
