import type { Fandom } from "../fandom.page-type.ts"

export const marvelCinematicUniverse = {
  id: "01a06808-5078-7002-b5c5-a97c10734575",
  pageTypeSlug: "fandom",
  slug: "marvel-cinematic-universe",
  title: "Marvel Cinematic Universe",
  partOfSlugs: ["superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
