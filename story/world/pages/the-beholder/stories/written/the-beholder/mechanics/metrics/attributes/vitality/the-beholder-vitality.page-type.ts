import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const theBeholderVitality = {
  id: "01a0deec-7455-7398-b676-2ee0c36883f2",
  type: "page-type/page-type",
  slug: "the-beholder-vitality",
  definition: "how healthy and durable a person in The Beholder is",
  extends: ["page-type/the-beholder-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
