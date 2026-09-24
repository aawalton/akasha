import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const jarom1 = {
  id: "019f0976-dbfe-77dd-ac40-fa29d3bc7510",
  type: "page-type/scripture-passage",
  slug: "jarom-1",
  title: "Jarom 1",
  partOfCollections: ["scripture-collection/jarom"],
  translation: "book-of-mormon",
  position: 63,
  passageText: "txt",
  status: "not-started",
  externalId: "jarom1",
} as const satisfies ScripturePassage
