import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiAttribute = {
  id: "01a0de4a-4a00-7b4c-b24d-e11dd6a3b813",
  type: "page-type/page-type",
  slug: "partners-ii-attribute",
  definition: "a number for a persistent property of a character in Partners II",
  pluralSlug: "attributes",
  extends: ["page-type/metric-character-attribute"],
  parts: [
    "page-type/partners-ii-might",
    "page-type/partners-ii-grace",
    "page-type/partners-ii-vitality",
    "page-type/partners-ii-mind",
    "page-type/partners-ii-essence",
    "page-type/partners-ii-presence",
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
