import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsColourSpectrum = {
  id: "01a0b9ee-d65b-741a-a376-b2845e193f46",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-colour-spectrum",
  ownLength: 1.0017666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3VqiD8Yvk6bKwqS1e64PHB",
      externalLink: "https://open.spotify.com/track/3VqiD8Yvk6bKwqS1e64PHB",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Colour Spectrum",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "colourspectrum|4gzpq5DPGxSnKTe4SA8HAU|60106",
  song: "song/coldplay-colour-spectrum",
} as const satisfies Track
