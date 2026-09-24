import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadGreenEyes = {
  id: "01a0b9ee-e864-75e4-bfce-d59d66ae5055",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-green-eyes",
  ownLength: 3.7173333333333334,
  ownProgress: 3.7173333333333334,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  status: "completed",
  unit: "unit/minutes",
  title: "Green Eyes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "greeneyes|4gzpq5DPGxSnKTe4SA8HAU|223040",
  song: "song/coldplay-green-eyes",
  carriedBy: [
    {
      release: "release/coldplay-a-rush-of-blood-to-the-head",
      discNumber: 1,
      position: 7,
      externalId: "3ou9rSNUQnE7XYmJkUUIOc",
      externalLink: "https://open.spotify.com/track/3ou9rSNUQnE7XYmJkUUIOc",
    },
  ],
} as const satisfies Track
