import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const theBeholderMight = {
  id: "01a0deec-7455-74de-a053-13064ed244e8",
  type: "page-type/page-type",
  slug: "the-beholder-might",
  definition: "how much physical force a person in The Beholder has",
  extends: ["page-type/the-beholder-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
