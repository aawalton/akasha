import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionRole = {
  id: "01a05fcd-41a8-7cf6-b803-033e5142d8cf",
  type: "page-type/page-type",
  slug: "temper-companion-role",
  definition: "a mix of parts a companion plays at once",
  extends: ["page-type/temper-companion-thing"],
  properties: [{ pageProperty: "text-property/key", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
