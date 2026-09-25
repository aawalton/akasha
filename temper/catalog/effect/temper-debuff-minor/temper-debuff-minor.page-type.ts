import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperDebuffMinor = {
  id: "01a05fc5-94cf-7f43-9797-17fbafcb401e",
  type: "page-type/page-type",
  slug: "temper-debuff-minor",
  definition: "a harmful effect the game names Minor",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/minor-debuff"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
