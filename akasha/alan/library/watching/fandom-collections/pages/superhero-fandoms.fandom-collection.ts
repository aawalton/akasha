import type { FandomCollection } from "../fandom-collection.page-type.ts"

export const superheroFandoms = {
  id: "01a06808-5f7f-7004-af84-eb6d8c150292",
  pageTypeSlug: "fandom-collection",
  slug: "superhero-fandoms",
  title: "Superhero Fandoms",
  partOfSlugs: ["fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies FandomCollection
