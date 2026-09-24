import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYLow = {
  id: "01a0b9ee-e505-7c54-b566-7049aa2580c5",
  type: "page-type/track",
  slug: "coldplay-x-y-low",
  ownLength: 5.535066666666666,
  ownProgress: 5.535066666666666,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "Low",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "low|4gzpq5DPGxSnKTe4SA8HAU|332104",
  song: "song/coldplay-low",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 9,
      externalId: "1BBtng1KOF0JuC6bSNgGmp",
      externalLink: "https://open.spotify.com/track/1BBtng1KOF0JuC6bSNgGmp",
    },
  ],
} as const satisfies Track
