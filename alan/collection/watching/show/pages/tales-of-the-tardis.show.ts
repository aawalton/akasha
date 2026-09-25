import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const talesOfTheTardis = {
  id: "01a06802-9332-7040-abe2-62dd3411b3b1",
  type: "page-type/show",
  slug: "tales-of-the-tardis",
  title: "Tales of the TARDIS",
  partOfCollections: ["fandom/doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-11-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/tales-of-the-tardis",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Show
