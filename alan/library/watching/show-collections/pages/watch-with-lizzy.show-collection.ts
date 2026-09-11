import type { ShowCollection } from "akasha/alan/library/watching/show-collections/show-collection.page-type.types.ts"

export const watchWithLizzy = {
  id: "01a06808-6a77-7017-b0dd-953bd5d2c830",
  type: "show-collection",
  slug: "watch-with-lizzy",
  title: "Watch with Lizzy",
  partOfCollections: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
