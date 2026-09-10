import type { Fandom } from "../fandom.page-type.types.ts"

export const dcExtendedUniverse = {
  id: "01a06808-5077-7003-bb1d-2f8939282527",
  pageTypeSlug: "fandom",
  type: "fandom",
  slug: "dc-extended-universe",
  title: "DC Extended Universe",
  partOfCollections: ["superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
