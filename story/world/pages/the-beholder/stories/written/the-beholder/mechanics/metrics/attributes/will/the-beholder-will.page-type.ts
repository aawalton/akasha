import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const theBeholderWill = {
  id: "01a0deec-7455-79c2-b6eb-c2c8bf246a19",
  type: "page-type/page-type",
  slug: "the-beholder-will",
  definition: "how strong the psyche of a person in The Beholder is",
  extends: ["page-type/the-beholder-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
