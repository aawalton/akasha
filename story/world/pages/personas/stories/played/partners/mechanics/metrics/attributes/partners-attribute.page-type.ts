import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersAttribute = {
  id: "01a0de49-9786-760b-a22f-a1daacbe670c",
  type: "page-type/page-type",
  slug: "partners-attribute",
  definition: "the modifier a character in Partners adds to a roll for a persistent property",
  pluralSlug: "attributes",
  extends: ["page-type/metric-character-attribute"],
  parts: ["page-type/partners-mind", "page-type/partners-essence", "page-type/partners-presence"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
