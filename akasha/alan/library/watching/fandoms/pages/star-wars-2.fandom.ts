import type { Fandom } from "../fandom.page-type.ts"

export const starWars2 = {
  id: "01a06808-5078-7009-aef0-2de7f2a6dd95",
  pageTypeSlug: "fandom",
  slug: "star-wars-2",
  title: "Star Wars",
  partOfSlugs: ["science-fiction-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
  rank: "B",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
