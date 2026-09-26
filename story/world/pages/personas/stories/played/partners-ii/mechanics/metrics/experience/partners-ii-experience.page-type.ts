import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiExperience = {
  id: "01a0de48-11f7-7d59-a129-f646c1b9c853",
  type: "page-type/page-type",
  slug: "partners-ii-experience",
  definition: "the experience a character in Partners II has earned",
  pluralSlug: "experience",
  extends: ["page-type/metric-character-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
