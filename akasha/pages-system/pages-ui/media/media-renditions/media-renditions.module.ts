import type { Module } from "@akasha/code-system/module"

export const mediaRenditions = {
  id: "01a05c27-31ee-7970-b6e2-34d2259bcdab",
  pageTypeSlug: "module",
  slug: "media-renditions",
  definition:
    "which stored rendition variants of a page's medium exist, and which one plays by default",
  code: "ts",
} as const satisfies Module
