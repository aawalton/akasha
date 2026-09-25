import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theTwilightZone2019 = {
  id: "01a06802-9333-7006-a6a6-fc5a766ed6c7",
  type: "page-type/show",
  slug: "the-twilight-zone-2019",
  title: "The Twilight Zone (2019)",
  partOfCollections: ["show-collection/the-twilight-zone"],
  position: 2019,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-04-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "the-twilight-zone-2019",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-2019",
      lastSyncedAt: "2025-10-30",
    },
  ],
} as const satisfies Show
