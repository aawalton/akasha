import type { Fandom } from "../fandom.page-type.ts"

export const starTrek3 = {
  id: "01a06808-5078-7008-8695-323b30891ef7",
  pageTypeSlug: "fandom",
  type: "fandom",
  slug: "star-trek-3",
  title: "Star Trek",
  partOfCollections: ["science-fiction-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
  rank: "A",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
