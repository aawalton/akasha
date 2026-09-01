import type { Module } from "@akasha/code-system/module"

export const mediaFormats = {
  id: "01a05b92-a9c7-7eee-a32e-cf8377737388",
  pageTypeSlug: "module",
  slug: "media-formats",
  definition: "the file extension and content type for each media kind a page can hold",
  code: "ts",
} as const satisfies Module
