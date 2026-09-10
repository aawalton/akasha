import type { ReleaseCollection } from "../release-collection.page-type.types.ts"

export const musicalTheater = {
  id: "01a06808-805e-7001-a4fe-a8b0bdcbc84d",
  pageTypeSlug: "release-collection",
  type: "release-collection",
  slug: "musical-theater",
  title: "Musical Theater",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "following",
} as const satisfies ReleaseCollection
