import type { Module } from "@akasha/code-system/module"

export const readerProse = {
  id: "01a05c3d-a2e7-7b06-a66e-82d41ecf1e27",
  pageTypeSlug: "module",
  slug: "reader-prose",
  definition:
    "Parses a prose body into blocks, splits inline emphasis, and estimates each block's height.",
  code: "ts",
} as const satisfies Module
