import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const watchWithLizzy = {
  id: "01a06808-6a77-7017-b0dd-953bd5d2c830",
  type: "page-type/show-collection",
  slug: "watch-with-lizzy",
  title: "Watch with Lizzy",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:37.143Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies ShowCollection
