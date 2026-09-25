import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const doctorWho19631989 = {
  id: "01a06802-9331-701b-80c5-b63699213837",
  type: "page-type/show",
  slug: "doctor-who-1963-1989",
  title: "Doctor Who (1963-1989)",
  partOfCollections: ["fandom/doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1963-11-23",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/doctor-who",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
