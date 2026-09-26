import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiMight = {
  id: "01a0de4a-4a00-7e52-8974-74346373e752",
  type: "page-type/page-type",
  slug: "partners-ii-might",
  definition: "how strong a character in Partners II is",
  pluralSlug: "might",
  extends: ["page-type/partners-ii-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
