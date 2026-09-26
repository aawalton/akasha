import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersIiFocus = {
  id: "01a0de49-1709-7999-8ab8-541050f797e1",
  type: "page-type/page-type",
  slug: "partners-ii-focus",
  definition: "the focus a character in Partners II has left",
  pluralSlug: "focus",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
