import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const theLordOfTheRingsShows = {
  id: "01a06808-6a77-7013-8f4d-22bb84e3f43f",
  type: "page-type/show-collection",
  slug: "the-lord-of-the-rings-shows",
  title: "The Lord of The Rings Shows",
  partOfCollections: ["fandom/the-lord-of-the-rings-2"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "A",
  createdAt: "2026-09-03T16:09:37.143Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies ShowCollection
