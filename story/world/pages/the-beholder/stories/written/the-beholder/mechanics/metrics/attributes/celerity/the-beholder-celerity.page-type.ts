import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const theBeholderCelerity = {
  id: "01a0deec-7455-7dce-a7bd-1891f4666e1c",
  type: "page-type/page-type",
  slug: "the-beholder-celerity",
  definition: "how fast a person in The Beholder moves and reacts",
  extends: ["page-type/the-beholder-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
