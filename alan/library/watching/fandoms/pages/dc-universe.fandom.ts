import type { Fandom } from "../fandom.page-type.types.ts"

export const dcUniverse = {
  id: "01a06808-5077-7004-8c32-194339671fda",
  pageTypeSlug: "fandom",
  type: "fandom",
  slug: "dc-universe",
  title: "DC Universe",
  partOfCollections: ["superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
