import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiMind = {
  id: "01a0de4a-4a00-778d-8e40-7e70a830254c",
  type: "page-type/page-type",
  slug: "partners-ii-mind",
  definition: "how sharp the thinking of a character in Partners II is",
  pluralSlug: "mind",
  extends: ["page-type/partners-ii-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
