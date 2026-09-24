import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayASkyFullOfStarsASkyFullOfStars = {
  id: "01a0b9ee-f790-7ee4-98b7-ff247e9da786",
  type: "page-type/track",
  slug: "coldplay-a-sky-full-of-stars-a-sky-full-of-stars",
  ownLength: 4.464433333333333,
  ownProgress: 4.464433333333333,
  partOfCollections: ["release/coldplay-a-sky-full-of-stars", "release/coldplay-ghost-stories"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Sky Full of Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "askyfullofstars|4gzpq5DPGxSnKTe4SA8HAU|267866",
  song: "song/coldplay-a-sky-full-of-stars",
  carriedBy: [
    {
      release: "release/coldplay-a-sky-full-of-stars",
      discNumber: 1,
      position: 1,
      externalId: "6HFbq7cewJ7rPiffV0ciil",
      externalLink: "https://open.spotify.com/track/6HFbq7cewJ7rPiffV0ciil",
    },
    {
      release: "release/coldplay-ghost-stories",
      discNumber: 1,
      position: 8,
      externalId: "0FDzzruyVECATHXKHFs9eJ",
      externalLink: "https://open.spotify.com/track/0FDzzruyVECATHXKHFs9eJ",
    },
  ],
} as const satisfies Track
