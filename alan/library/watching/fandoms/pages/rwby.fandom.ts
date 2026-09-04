import type { Fandom } from "../fandom.page-type.ts"

export const rwby = {
  id: "01a06808-5078-7007-95d3-9920b7fbea33",
  pageTypeSlug: "fandom",
  slug: "rwby",
  title: "RWBY",
  partOfSlugs: ["anime-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
  rank: "A",
} as const satisfies Fandom
