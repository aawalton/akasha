import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiNightAtTheOperaIntermission = {
  id: "01a17878-1d57-70c6-9741-e05877ae7e10",
  type: "page-type/release",
  slug: "emei-night-at-the-opera-intermission",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2026-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1wR0iRw6AKwbNED8OG37PB",
      externalLink: "https://open.spotify.com/album/1wR0iRw6AKwbNED8OG37PB",
      lastSyncedAt: "2026-10-26",
    },
  ],
  title: "Night at the Opera: Intermission",
  createdAt: "2026-10-26T13:48:20.183Z",
  updatedAt: "2026-10-26T14:01:00.531Z",
} as const satisfies Release
