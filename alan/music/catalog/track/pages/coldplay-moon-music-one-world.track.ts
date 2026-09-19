import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicOneWorld = {
  id: "01a0b9ee-ca13-7fa7-b3bd-474fad0a51a2",
  type: "page-type/track",
  slug: "coldplay-moon-music-one-world",
  ownLength: 6.794266666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7HFJpnjKUS7LGl8NiyfUE3",
      externalLink: "https://open.spotify.com/track/7HFJpnjKUS7LGl8NiyfUE3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ONE WORLD",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "oneworld|4gzpq5DPGxSnKTe4SA8HAU|407656",
  song: "song/coldplay-one-world",
} as const satisfies Track
