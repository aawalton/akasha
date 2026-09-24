import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadDaylight = {
  id: "01a0b9ee-e842-7b37-8f5a-f21957f01c4e",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-daylight",
  ownLength: 5.463333333333333,
  ownProgress: 5.463333333333333,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  status: "completed",
  unit: "unit/minutes",
  title: "Daylight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "daylight|4gzpq5DPGxSnKTe4SA8HAU|327800",
  song: "song/coldplay-daylight",
  carriedBy: [
    {
      release: "release/coldplay-a-rush-of-blood-to-the-head",
      discNumber: 1,
      position: 6,
      externalId: "4fP4xTSBli3tKck172LEZ4",
      externalLink: "https://open.spotify.com/track/4fP4xTSBli3tKck172LEZ4",
    },
  ],
} as const satisfies Track
