import type { Module } from "@akasha/code/module"

export const mediaToken = {
  id: "01a05c27-31ee-78e6-8559-1de73e833862",
  pageTypeSlug: "module",
  type: "module",
  slug: "media-token",
  definition: "an expiring HMAC token over a page, medium and variant, minted and checked",
  code: "ts",
} as const satisfies Module
