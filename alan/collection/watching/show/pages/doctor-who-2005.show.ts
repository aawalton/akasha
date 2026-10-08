import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const doctorWho2005 = {
  id: "01a06802-9331-701c-84e0-4911261cc004",
  type: "page-type/show",
  slug: "doctor-who-2005",
  title: "Doctor Who (2005)",
  partOfCollections: ["fandom/doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "paused",
  publishedAt: "2005-03-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/doctor-who-2005",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Show
