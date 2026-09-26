import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiHp = {
  id: "01a0de49-170a-7291-8de6-11a383d575cc",
  type: "page-type/page-type",
  slug: "partners-ii-hp",
  definition: "the hit points a character in Partners II has left",
  pluralSlug: "hp",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
