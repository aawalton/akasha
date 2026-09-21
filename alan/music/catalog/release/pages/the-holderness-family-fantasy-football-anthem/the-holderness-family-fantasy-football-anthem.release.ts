import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyFantasyFootballAnthem = {
  id: "01a0676a-d71d-7061-b824-108a69cd65bb",
  type: "page-type/release",
  slug: "the-holderness-family-fantasy-football-anthem",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2022-09-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "72J9nRJcxP6AQxMabKUEV9",
      externalLink: "https://open.spotify.com/album/72J9nRJcxP6AQxMabKUEV9",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Fantasy Football Anthem",
} as const satisfies Release
