import type { Module } from "@akasha/code-system/module"

export const serveMedia = {
  id: "01a0629c-1ef6-7464-b843-8fc8bf31770a",
  pageTypeSlug: "module",
  slug: "serve-media",
  definition: "a page's rendered media answered over HTTP, with byte ranges capped",
  code: "ts",
} as const satisfies Module
