import type { FandomCollection } from "../fandom-collection.page-type.ts"

export const fantasyFandoms = {
  id: "01a06808-5f7f-7002-bcc1-c5d4d7487a5f",
  pageTypeSlug: "fandom-collection",
  slug: "fantasy-fandoms",
  title: "Fantasy Fandoms",
  partOfSlugs: ["fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies FandomCollection
