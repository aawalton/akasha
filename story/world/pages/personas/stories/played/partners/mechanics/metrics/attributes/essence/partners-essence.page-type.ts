import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersEssence = {
  id: "01a0de49-9785-78ce-886e-4d7d18529733",
  type: "page-type/page-type",
  slug: "partners-essence",
  definition: "how steady the inner power of a character in Partners is",
  pluralSlug: "essence",
  extends: ["page-type/partners-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
