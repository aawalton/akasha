import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersAttributeIncrease = {
  id: "01a0de49-9786-716b-bf90-03d0e768277e",
  type: "page-type/page-type",
  slug: "partners-attribute-increase",
  definition: "the attribute increases a character in Partners has won and not yet chosen",
  pluralSlug: "attribute-increases",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
