import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const omni1 = {
  id: "019f0976-dcbc-705d-8fb9-0b6c8daa9462",
  type: "page-type/scripture-passage",
  slug: "omni-1",
  title: "Omni 1",
  partOfCollections: ["scripture-collection/omni"],
  translation: "book-of-mormon",
  position: 64,
  passageText: "txt",
  unit: "unit/words",
  status: "not-started",
  externalId: "omni1",
} as const satisfies ScripturePassage
