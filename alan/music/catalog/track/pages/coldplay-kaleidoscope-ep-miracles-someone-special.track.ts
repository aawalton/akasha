import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpMiraclesSomeoneSpecial = {
  id: "01a0b9ee-f1c1-75eb-a21d-154b5e1fa2c5",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-miracles-someone-special",
  ownLength: 4.6151,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uJwPeBGb3swi85TSr9iIz",
      externalLink: "https://open.spotify.com/track/6uJwPeBGb3swi85TSr9iIz",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Miracles (Someone Special)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "0c173mlxpT3dSFRgMO8XPh", artistName: "Big Sean" },
  ],
  trackKey: "miraclessomeonespecial|0c173mlxpT3dSFRgMO8XPh,4gzpq5DPGxSnKTe4SA8HAU|276906",
  song: "song/coldplay-miracles-someone-special",
} as const satisfies Track
