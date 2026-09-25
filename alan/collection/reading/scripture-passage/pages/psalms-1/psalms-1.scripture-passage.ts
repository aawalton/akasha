import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const psalms1 = {
  id: "019ffda3-1cdf-73b2-918c-b4c1d2e5efcb",
  type: "page-type/scripture-passage",
  slug: "psalms-1",
  title: "Psalms 1",
  partOfCollections: ["scripture-collection/psalms"],
  translation: "web",
  position: 4,
  passageText: "txt",
  status: "not-started",
  externalId: "psalms1",
} as const satisfies ScripturePassage
