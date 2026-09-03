import type { ReleaseCollection } from "../release-collection.page-type.ts"

export const musicalTheater = {
  id: "01a06808-805e-7001-a4fe-a8b0bdcbc84d",
  pageTypeSlug: "release-collection",
  slug: "musical-theater",
  title: "Musical Theater",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
} as const satisfies ReleaseCollection
