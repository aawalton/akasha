import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterAttribute = {
  id: "01a0c9f6-f0c6-7de0-acb3-6f5f9252d4e2",
  type: "page-type/page-type",
  slug: "metric-character-attribute",
  definition: "a number for a persistent property of a character",
  pluralSlug: "attributes",
  extends: ["page-type/metric-character"],
  parts: [
    "page-type/metric-character-level",
    "page-type/metric-character-stat",
    "page-type/metric-character-fluency",
    "page-type/metric-character-notice",
    "page-type/tower-attribute",
    "page-type/tower-level",
    "page-type/cornerstone-faculty",
    "page-type/tower-of-nimue-attribute",
    "page-type/tower-of-nimue-level",
    "page-type/the-beholder-attribute",
  ],

  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T16:33:19.046Z",
  updatedAt: "2026-10-27T19:41:00.931Z",
} as const satisfies PageType
