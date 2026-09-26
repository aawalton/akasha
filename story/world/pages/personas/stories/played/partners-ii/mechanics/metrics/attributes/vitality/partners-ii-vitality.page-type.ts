import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiVitality = {
  id: "01a0de4a-4a00-7285-acff-0a920ac40f76",
  type: "page-type/page-type",
  slug: "partners-ii-vitality",
  definition: "how hardy a character in Partners II is",
  pluralSlug: "vitality",
  extends: ["page-type/partners-ii-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
