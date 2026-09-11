import type { ShowCollection } from "akasha/alan/library/watching/show-collections/show-collection.page-type.types.ts"

export const watchWithJoseph = {
  id: "01a06808-6a77-7016-a977-ec5f736bb7d4",
  type: "show-collection",
  slug: "watch-with-joseph",
  title: "Watch with Joseph",
  partOfCollections: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
