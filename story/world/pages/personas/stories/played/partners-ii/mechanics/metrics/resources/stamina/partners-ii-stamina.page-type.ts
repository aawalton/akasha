import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiStamina = {
  id: "01a0de49-170a-79f6-a674-0db2db785740",
  type: "page-type/page-type",
  slug: "partners-ii-stamina",
  definition: "the stamina a character in Partners II has left",
  pluralSlug: "stamina",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
