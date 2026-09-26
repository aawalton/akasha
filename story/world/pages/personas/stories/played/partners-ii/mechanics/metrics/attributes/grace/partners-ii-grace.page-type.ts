import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiGrace = {
  id: "01a0de4a-4a00-74a5-85b4-2e2024d5a3e4",
  type: "page-type/page-type",
  slug: "partners-ii-grace",
  definition: "how nimble a character in Partners II is",
  pluralSlug: "grace",
  extends: ["page-type/partners-ii-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
