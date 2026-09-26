import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const theBeholderAcuity = {
  id: "01a0deec-7454-7d95-bce3-b27be476f69b",
  type: "page-type/page-type",
  slug: "the-beholder-acuity",
  definition: "how keenly a person in The Beholder perceives and aims",
  extends: ["page-type/the-beholder-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
