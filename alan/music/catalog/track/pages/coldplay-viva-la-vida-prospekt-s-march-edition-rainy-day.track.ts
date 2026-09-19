import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEditionRainyDay = {
  id: "01a0b9ee-e1a5-794c-b260-a3a5e3513717",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition-rainy-day",
  ownLength: 3.4333666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-viva-la-vida-prospekt-s-march-edition"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "551YulB9BVtzcCQl0vX6nC",
      externalLink: "https://open.spotify.com/track/551YulB9BVtzcCQl0vX6nC",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rainy Day",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "rainyday|4gzpq5DPGxSnKTe4SA8HAU|206002",
  song: "song/coldplay-rainy-day",
} as const satisfies Track
