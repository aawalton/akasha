import type { Fandom } from "../fandom.page-type.ts"

export const dcUniverse = {
  id: "01a06808-5077-7004-8c32-194339671fda",
  pageTypeSlug: "fandom",
  slug: "dc-universe",
  title: "DC Universe",
  partOfSlugs: ["superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
