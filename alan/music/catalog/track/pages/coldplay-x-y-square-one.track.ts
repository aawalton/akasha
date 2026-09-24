import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayXYSquareOne = {
  id: "01a0b9ee-e3e4-7629-9846-4f3bfd4ecd99",
  type: "page-type/track",
  slug: "coldplay-x-y-square-one",
  ownLength: 4.7939,
  ownProgress: 4.7939,
  partOfCollections: ["release/coldplay-x-y"],
  status: "completed",
  unit: "unit/minutes",
  title: "Square One",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "squareone|4gzpq5DPGxSnKTe4SA8HAU|287634",
  song: "song/coldplay-square-one",
  carriedBy: [
    {
      release: "release/coldplay-x-y",
      discNumber: 1,
      position: 1,
      externalId: "2zQIITgo6sc5ppOfPcH205",
      externalLink: "https://open.spotify.com/track/2zQIITgo6sc5ppOfPcH205",
    },
  ],
} as const satisfies Track
