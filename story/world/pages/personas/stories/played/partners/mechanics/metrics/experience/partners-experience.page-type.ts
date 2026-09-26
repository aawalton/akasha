import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersExperience = {
  id: "01a0de47-b6d2-7bfc-88a6-98515ae043ca",
  type: "page-type/page-type",
  slug: "partners-experience",
  definition: "the experience a character in Partners has earned",
  pluralSlug: "experience",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
