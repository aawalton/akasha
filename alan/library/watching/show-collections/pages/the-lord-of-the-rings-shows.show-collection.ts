import type { ShowCollection } from "../show-collection.page-type.ts"

export const theLordOfTheRingsShows = {
  id: "01a06808-6a77-7013-8f4d-22bb84e3f43f",
  pageTypeSlug: "show-collection",
  slug: "the-lord-of-the-rings-shows",
  title: "The Lord of The Rings Shows",
  partOfSlugs: ["the-lord-of-the-rings-2"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "A",
} as const satisfies ShowCollection
