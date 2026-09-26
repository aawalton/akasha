import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersHp = {
  id: "01a0de49-9786-783e-a234-b7057dd06f75",
  type: "page-type/page-type",
  slug: "partners-hp",
  definition: "the hit points a character in Partners has left",
  pluralSlug: "hp",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
