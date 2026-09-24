import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const officialDeclaration = {
  id: "01a06808-34da-7020-8f84-83cebda4e275",
  type: "page-type/scripture-collection",
  slug: "official-declaration",
  title: "Official Declaration",
  partOfCollections: ["scripture-collection/doctrine-and-covenants"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "officialdeclaration",
} as const satisfies ScriptureCollection
