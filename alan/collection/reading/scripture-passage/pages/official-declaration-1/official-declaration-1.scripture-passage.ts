import type { ScripturePassage } from "akasha/alan/collection/reading/scripture-passage/scripture-passage.page-type.types.ts"

export const officialDeclaration1 = {
  id: "01a06804-11b0-7000-b443-82fdb19c0bba",
  type: "page-type/scripture-passage",
  slug: "official-declaration-1",
  title: "Official Declaration 1",
  partOfCollections: ["scripture-collection/official-declaration"],
  position: 1,
  ownLength: 0,
  unit: "unit/words",
  externalId: "officialdeclaration1",
} as const satisfies ScripturePassage
