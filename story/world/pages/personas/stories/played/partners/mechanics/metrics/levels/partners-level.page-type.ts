import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersLevel = {
  id: "01a0de47-b6d3-7e7f-b886-9bee3bc0e7d8",
  type: "page-type/page-type",
  slug: "partners-level",
  definition: "how far a character in Partners has come",
  pluralSlug: "levels",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
