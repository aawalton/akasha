import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012CharlieBrownLive = {
  id: "01a0b9ee-dae7-7a5c-9a3d-42cbf80f79ea",
  type: "page-type/track",
  slug: "coldplay-live-2012-charlie-brown-live",
  ownLength: 5.012433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-2012"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1u0LrLPnIfVeHOzFfye3Lf",
      externalLink: "https://open.spotify.com/track/1u0LrLPnIfVeHOzFfye3Lf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Charlie Brown - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "charliebrownlive|4gzpq5DPGxSnKTe4SA8HAU|300746",
  song: "song/coldplay-charlie-brown",
} as const satisfies Track
