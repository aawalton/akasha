import type { Module } from "@akasha/code-system/module"

export const recordViewStaleness = {
  id: "01a05c7d-d06c-7985-bfc8-15ef610079f6",
  pageTypeSlug: "module",
  slug: "record-view-staleness",
  definition: "whether a page has gone unseen long enough that seeing it again is worth recording",
  code: "ts",
} as const satisfies Module
