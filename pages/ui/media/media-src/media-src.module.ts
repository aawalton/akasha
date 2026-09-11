import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const mediaSrc = {
  id: "01a05c27-31ee-7af4-936c-30e239d69c4c",
  type: "module",
  slug: "media-src",
  definition: "the url a page's medium is fetched from, by variant and starting sentence",
  code: "ts",
} as const satisfies Module
