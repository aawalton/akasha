import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiLevel = {
  id: "01a0de48-11f8-71fb-a527-edaf6cb91488",
  type: "page-type/page-type",
  slug: "partners-ii-level",
  definition: "how far a character in Partners II has come",
  pluralSlug: "levels",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
