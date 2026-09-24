import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlRightHere = {
  id: "01a0aa7c-3094-7f9f-a8dd-67d6992a5040",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-right-here",
  ownLength: 3.7706166666666667,
  ownProgress: 3.7706166666666667,
  partOfCollections: [
    "release/zara-larsson-poster-girl",
    "release/zara-larsson-poster-girl-summer-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Right Here",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "righthere|1Xylc3o4UrD53lo9CvFvVg|226237",
  song: "song/zara-larsson-right-here",
  carriedBy: [
    {
      release: "release/zara-larsson-poster-girl",
      discNumber: 1,
      position: 4,
      externalId: "5Wlft6NsN2G4EyXY7tR8hj",
      externalLink: "https://open.spotify.com/track/5Wlft6NsN2G4EyXY7tR8hj",
    },
    {
      release: "release/zara-larsson-poster-girl-summer-edition",
      discNumber: 1,
      position: 4,
      externalId: "5D6KxyEMOyO2tDwAOdhJ5A",
      externalLink: "https://open.spotify.com/track/5D6KxyEMOyO2tDwAOdhJ5A",
    },
  ],
} as const satisfies Track
