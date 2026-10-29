import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelZombiesMiniseries = {
  id: "01a06802-b8ba-7053-84ea-4e64fcb8892a",
  type: "page-type/season",
  slug: "marvel-zombies-miniseries",
  title: "Marvel Zombies Miniseries",
  partOfCollections: ["show/marvel-zombies"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-279654",
      externalLink: "https://trakt.tv/shows/marvel-zombies/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:32:14.686Z",
} as const satisfies Season
