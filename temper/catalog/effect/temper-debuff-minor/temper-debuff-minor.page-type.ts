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
    { pageProperty: "text-property/effect-category", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:39:39.343Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies PageType
