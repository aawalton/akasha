import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const avatarTheLastAirbender = {
  id: "01a06802-9331-7007-95e3-b9560ead3f8a",
  type: "page-type/show",
  slug: "avatar-the-last-airbender",
  title: "Avatar: The Last Airbender",
  partOfCollections: ["show-collection/family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2005-02-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/avatar-the-last-airbender",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "82452", externalLink: "https://www.themoviedb.org/tv/82452" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:24:26.690Z",
} as const satisfies Show
