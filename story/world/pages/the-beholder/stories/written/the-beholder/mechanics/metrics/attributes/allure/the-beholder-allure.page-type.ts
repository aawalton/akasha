import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const theBeholderAllure = {
  id: "01a0deec-7455-7247-a098-9564521797b6",
  type: "page-type/page-type",
  slug: "the-beholder-allure",
  definition: "how much presence and aesthetic gravity a person in The Beholder has",
  extends: ["page-type/the-beholder-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
