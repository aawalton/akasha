import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const allowedTerm = {
  id: "01a081ea-6fce-7964-b581-84f1a80077c6",
  type: "page-type/page-type",
  slug: "allowed-term",
  definition: "a term akasha writes",
  extends: ["page-type/term"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
