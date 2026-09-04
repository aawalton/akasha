import type { Fandom } from "../fandom.page-type.ts"

export const battlestarGalactica = {
  id: "01a06808-5077-7002-8ed4-51e500a536f4",
  pageTypeSlug: "fandom",
  slug: "battlestar-galactica",
  title: "Battlestar Galactica",
  partOfSlugs: ["science-fiction-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
