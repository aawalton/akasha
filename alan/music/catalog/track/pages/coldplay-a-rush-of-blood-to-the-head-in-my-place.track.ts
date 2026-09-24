import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadInMyPlace = {
  id: "01a0b9ee-e7b0-7e49-8af2-5d0fe2329870",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-in-my-place",
  ownLength: 3.778,
  ownProgress: 3.778,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  status: "completed",
  unit: "unit/minutes",
  title: "In My Place",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "inmyplace|4gzpq5DPGxSnKTe4SA8HAU|226680",
  song: "song/coldplay-in-my-place",
  carriedBy: [
    {
      release: "release/coldplay-a-rush-of-blood-to-the-head",
      discNumber: 1,
      position: 2,
      externalId: "2nvC4i2aMo4CzRjRflysah",
      externalLink: "https://open.spotify.com/track/2nvC4i2aMo4CzRjRflysah",
    },
  ],
} as const satisfies Track
