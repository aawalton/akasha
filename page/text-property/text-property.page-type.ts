import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const textProperty = {
  id: "01a04dff-9d7d-7b50-a58a-419207af8ec0",
  type: "page-type/page-type",
  slug: "text-property",
  definition: "a page property holding text",
  parts: ["relation-property/name-format"],
  extends: ["page-type/page-property"],
  properties: [
    { pageProperty: "number-property/max-length", required: true, many: false },
    { pageProperty: "relation-property/name-format", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
  createdAt: "2026-08-29T14:49:52.765Z",
  updatedAt: "2026-09-15T15:39:28.000Z",
} as const satisfies PageType
