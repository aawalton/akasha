import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theTwilightZone1985 = {
  id: "01a06802-9333-7004-8613-c7ab0670e942",
  type: "page-type/show",
  slug: "the-twilight-zone-1985",
  title: "The Twilight Zone (1985)",
  partOfCollections: ["show-collection/the-twilight-zone"],
  position: 1985,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1985-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "the-twilight-zone",
      externalLink: "https://trakt.tv/shows/the-twilight-zone",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Show
