import type { Fandom } from "../fandom.page-type.types.ts"

export const marvelTelevision = {
  id: "01a06808-5078-7003-bfb0-030d89cfba9f",
  pageTypeSlug: "fandom",
  type: "fandom",
  slug: "marvel-television",
  title: "Marvel Television",
  partOfCollections: ["superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
  lastSyncedAt: "2025-10-01",
} as const satisfies Fandom
