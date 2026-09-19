import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLiveInBuenosAiresColourSpectrumLiveInBuenosAires = {
  id: "01a0b9ee-d3ef-7116-83d7-5366725a17ea",
  type: "page-type/track",
  slug: "coldplay-live-in-buenos-aires-colour-spectrum-live-in-buenos-aires",
  ownLength: 1.9626666666666666,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-live-in-buenos-aires"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5MVyXzR1HARqSkQjhPrNBO",
      externalLink: "https://open.spotify.com/track/5MVyXzR1HARqSkQjhPrNBO",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Colour Spectrum - Live in Buenos Aires",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "colourspectrumliveinbuenosaires|4gzpq5DPGxSnKTe4SA8HAU|117760",
  song: "song/coldplay-colour-spectrum",
} as const satisfies Track
