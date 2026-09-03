import type { ReleaseCollection } from "../release-collection.page-type.ts"

export const theLordOfTheRingsMusic = {
  id: "01a06808-805e-7002-934c-fa9b7c35f3a8",
  pageTypeSlug: "release-collection",
  slug: "the-lord-of-the-rings-music",
  title: "The Lord of The Rings Music",
  partOfSlugs: ["the-lord-of-the-rings-2"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  rank: "B",
} as const satisfies ReleaseCollection
