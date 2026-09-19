import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionIAmAMountain = {
  id: "01a0b9ee-cc93-71dc-99a1-0941d7392f04",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-i-am-a-mountain",
  ownLength: 3.1135,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2NYCEJK25YURZTQSA0msEZ",
      externalLink: "https://open.spotify.com/track/2NYCEJK25YURZTQSA0msEZ",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "i Am A Mountain",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "iamamountain|4gzpq5DPGxSnKTe4SA8HAU|186810",
  song: "song/coldplay-i-am-a-mountain",
} as const satisfies Track
