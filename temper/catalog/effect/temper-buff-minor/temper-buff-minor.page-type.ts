import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperBuffMinor = {
  id: "01a05fc5-94ce-7bed-8828-2d7236ba09a9",
  type: "page-type/page-type",
  slug: "temper-buff-minor",
  definition: "a helpful effect the game names Minor",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/minor-buff"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "page-property-entry/effects", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
