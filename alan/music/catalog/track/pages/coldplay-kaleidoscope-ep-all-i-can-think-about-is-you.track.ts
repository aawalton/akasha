import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpAllICanThinkAboutIsYou = {
  id: "01a0b9ee-f198-7051-9a2f-94fcc37e52af",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-all-i-can-think-about-is-you",
  ownLength: 4.576433333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6V6goat94tTJOWXXKZstNX",
      externalLink: "https://open.spotify.com/track/6V6goat94tTJOWXXKZstNX",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All I Can Think About Is You",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "allicanthinkaboutisyou|4gzpq5DPGxSnKTe4SA8HAU|274586",
  song: "song/coldplay-all-i-can-think-about-is-you",
} as const satisfies Track
