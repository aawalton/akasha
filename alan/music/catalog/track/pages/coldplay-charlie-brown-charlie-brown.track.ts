import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayCharlieBrownCharlieBrown = {
  id: "01a0b9ee-f8f7-7554-8b57-a9932e44bf78",
  type: "page-type/track",
  slug: "coldplay-charlie-brown-charlie-brown",
  ownLength: 4.75265,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-charlie-brown"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2xmG19ADoSwiEkBOJZ6poQ",
      externalLink: "https://open.spotify.com/track/2xmG19ADoSwiEkBOJZ6poQ",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Charlie Brown",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "charliebrown|4gzpq5DPGxSnKTe4SA8HAU|285159",
  song: "song/coldplay-charlie-brown",
} as const satisfies Track
