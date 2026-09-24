import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayAHeadFullOfDreamsColourSpectrum = {
  id: "01a0b9ee-d65b-741a-a376-b2845e193f46",
  type: "page-type/track",
  slug: "coldplay-a-head-full-of-dreams-colour-spectrum",
  ownLength: 1.0017666666666667,
  ownProgress: 1.0017666666666667,
  partOfCollections: ["release/coldplay-a-head-full-of-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "Colour Spectrum",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "colourspectrum|4gzpq5DPGxSnKTe4SA8HAU|60106",
  song: "song/coldplay-colour-spectrum",
  carriedBy: [
    {
      release: "release/coldplay-a-head-full-of-dreams",
      discNumber: 1,
      position: 10,
      externalId: "3VqiD8Yvk6bKwqS1e64PHB",
      externalLink: "https://open.spotify.com/track/3VqiD8Yvk6bKwqS1e64PHB",
    },
  ],
} as const satisfies Track
