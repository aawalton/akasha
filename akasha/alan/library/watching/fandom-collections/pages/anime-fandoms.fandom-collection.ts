import type { FandomCollection } from "../fandom-collection.page-type.ts"

export const animeFandoms = {
  id: "01a06808-5f7f-7000-afdb-200adf4ef0cc",
  pageTypeSlug: "fandom-collection",
  slug: "anime-fandoms",
  title: "Anime Fandoms",
  partOfSlugs: ["fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
  rank: "B",
} as const satisfies FandomCollection
