import type { ScripturePassage } from "akasha/alan/library/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const scripturePassage1Nephi2 = {
  id: "019f0976-ac67-7f0d-bab9-f825adabfea8",
  type: "page-type/scripture-passage",
  slug: "scripture-passage-1-nephi-2",
  title: "1 Nephi 2",
  partOfCollections: ["scripture-collection/scripture-collection-1-nephi"],
  book: "1 Nephi",
  translation: "book-of-mormon",
  position: 1,
  passageText: "txt",
  status: "not-started",
  externalId: "1nephi2",
} as const satisfies ScripturePassage
