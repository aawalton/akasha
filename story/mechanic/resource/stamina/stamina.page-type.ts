import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const stamina = {
  id: "01a0c9d4-f409-77dd-b9df-5575d1f8d994",
  type: "page-type/page-type",
  slug: "stamina",
  definition: "the vigour a character has left",
  extends: ["page-type/resource"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
