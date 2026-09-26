import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersFocus = {
  id: "01a0de49-9786-7eb5-872b-76b870e2c5bf",
  type: "page-type/page-type",
  slug: "partners-focus",
  definition: "the focus a character in Partners has left",
  pluralSlug: "focus",
  extends: ["page-type/metric-character-resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
