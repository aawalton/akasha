import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersMind = {
  id: "01a0de49-9786-7fcf-9b9f-5b72762599e1",
  type: "page-type/page-type",
  slug: "partners-mind",
  definition: "how keenly a character in Partners reads and reasons",
  pluralSlug: "mind",
  extends: ["page-type/partners-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
