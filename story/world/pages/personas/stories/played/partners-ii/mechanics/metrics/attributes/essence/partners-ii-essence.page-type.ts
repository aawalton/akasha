import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiEssence = {
  id: "01a0de4a-49ff-7dd4-95cd-789bf1c64f3c",
  type: "page-type/page-type",
  slug: "partners-ii-essence",
  definition: "how deep the inner power of a character in Partners II runs",
  pluralSlug: "essence",
  extends: ["page-type/partners-ii-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
