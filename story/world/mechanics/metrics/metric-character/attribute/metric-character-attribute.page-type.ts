import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterAttribute = {
  id: "01a0c9f6-f0c6-7de0-acb3-6f5f9252d4e2",
  type: "page-type/page-type",
  slug: "metric-character-attribute",
  definition: "a number for a persistent property of a character",
  pluralSlug: "attributes",
  extends: ["page-type/metric-character"],
  parts: ["page-type/tower-attribute", "page-type/tower-level"],

  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
