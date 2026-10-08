import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperBuffMajor = {
  id: "01a05fc5-94ce-7166-8475-467d3eb17bf9",
  type: "page-type/page-type",
  slug: "temper-buff-major",
  definition: "a helpful effect the game names Major",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/major-buff", "text-property/effect-category"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "page-property-entry/effects", required: true, many: false },
    { pageProperty: "text-property/effect-category", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-02T01:39:39.342Z",
  updatedAt: "2026-09-26T18:25:50.000Z",
} as const satisfies PageType
