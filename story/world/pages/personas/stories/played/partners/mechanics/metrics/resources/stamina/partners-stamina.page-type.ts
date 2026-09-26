import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersStamina = {
  id: "01a0de49-9786-7527-82d0-6e919cd48dd9",
  type: "page-type/page-type",
  slug: "partners-stamina",
  definition: "the stamina a character in Partners has left",
  pluralSlug: "stamina",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
