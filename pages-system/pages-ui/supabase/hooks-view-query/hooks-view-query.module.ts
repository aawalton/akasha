import type { Module } from "@akasha/code-system/module"

export const hooksViewQuery = {
  id: "01a061df-fe7f-7004-be80-088a1f3b4cda",
  pageTypeSlug: "module",
  slug: "hooks-view-query",
  definition:
    "The rows one view asks for, read from the store and narrowed by the view's own filters.",
  code: "ts",
} as const satisfies Module
