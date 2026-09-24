import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayARushOfBloodToTheHeadAmsterdam = {
  id: "01a0b9ee-e8fa-72cf-9f29-74cbee62111c",
  type: "page-type/track",
  slug: "coldplay-a-rush-of-blood-to-the-head-amsterdam",
  ownLength: 5.322666666666667,
  ownProgress: 5.322666666666667,
  partOfCollections: ["release/coldplay-a-rush-of-blood-to-the-head"],
  status: "completed",
  unit: "unit/minutes",
  title: "Amsterdam",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "amsterdam|4gzpq5DPGxSnKTe4SA8HAU|319360",
  song: "song/coldplay-amsterdam",
  carriedBy: [
    {
      release: "release/coldplay-a-rush-of-blood-to-the-head",
      discNumber: 1,
      position: 11,
      externalId: "2uQ4px5SPONsgcUpulywIQ",
      externalLink: "https://open.spotify.com/track/2uQ4px5SPONsgcUpulywIQ",
    },
  ],
} as const satisfies Track
