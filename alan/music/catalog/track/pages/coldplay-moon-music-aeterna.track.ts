import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicAeterna = {
  id: "01a0b9ee-c9bf-736a-978f-72111239e916",
  type: "page-type/track",
  slug: "coldplay-moon-music-aeterna",
  ownLength: 4.217133333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4EGl6H86WFalKVWSXbheb2",
      externalLink: "https://open.spotify.com/track/4EGl6H86WFalKVWSXbheb2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "AETERNA",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "aeterna|4gzpq5DPGxSnKTe4SA8HAU|253028",
  song: "song/coldplay-aeterna",
} as const satisfies Track
