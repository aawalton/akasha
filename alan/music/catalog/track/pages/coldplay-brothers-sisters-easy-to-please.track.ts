import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayBrothersSistersEasyToPlease = {
  id: "01a0b9ef-0581-7ba8-81e9-3c0aa73e4d6f",
  type: "page-type/track",
  slug: "coldplay-brothers-sisters-easy-to-please",
  ownLength: 3.0326666666666666,
  ownProgress: 3.0326666666666666,
  partOfCollections: ["release/coldplay-brothers-sisters"],
  status: "completed",
  unit: "unit/minutes",
  title: "Easy To Please",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "easytoplease|4gzpq5DPGxSnKTe4SA8HAU|181960",
  song: "song/coldplay-easy-to-please",
  carriedBy: [
    {
      release: "release/coldplay-brothers-sisters",
      discNumber: 1,
      position: 2,
      externalId: "6KHZ9SElsSmjQI7B9D0e4P",
      externalLink: "https://open.spotify.com/track/6KHZ9SElsSmjQI7B9D0e4P",
    },
  ],
} as const satisfies Track
