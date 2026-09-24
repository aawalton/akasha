import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStars2ASkyFullOfStars = {
  id: "01a0b9ee-f642-787c-b58d-c1e044fd6fb1",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-2-a-sky-full-of-stars",
  ownLength: 3.93965,
  ownProgress: 3.93965,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Sky Full of Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "askyfullofstars|4gzpq5DPGxSnKTe4SA8HAU|236379",
  song: "song/coldplay-a-sky-full-of-stars",
  carriedBy: [
    {
      release: "release/coldplay-a-sky-full-of-stars-2",
      discNumber: 1,
      position: 1,
      externalId: "2nzI2futOM8isgXNKAlQ1m",
      externalLink: "https://open.spotify.com/track/2nzI2futOM8isgXNKAlQ1m",
    },
  ],
} as const satisfies Track
