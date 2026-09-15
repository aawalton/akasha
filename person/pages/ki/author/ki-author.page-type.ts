import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kiAuthor = {
  id: "01a06825-d0ec-792e-8a52-144c147087f5",
  type: "page-type",
  slug: "ki-author",
  definition: "someone who wrote a book Ki keeps",
  extends: ["page-type/ki-collection-template"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
