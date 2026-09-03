import type { Fandom } from "../fandom.page-type.ts"

export const dcExtendedUniverse = {
  id: "01a06808-5077-7003-bb1d-2f8939282527",
  pageTypeSlug: "fandom",
  slug: "dc-extended-universe",
  title: "DC Extended Universe",
  partOfSlugs: ["superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
