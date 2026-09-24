import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversHoundDog = {
  id: "01a0abeb-348c-735b-8262-1aa7f750cd16",
  type: "page-type/track",
  slug: "james-taylor-2-covers-hound-dog",
  ownLength: 3.050883333333333,
  ownProgress: 3.050883333333333,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hound Dog",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "hounddog|0vn7UBvSQECKJm2817Yf1P|183053",
  song: "song/james-taylor-hound-dog",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 8,
      externalId: "2kqpwVLLYRuiYm8J8M4RrZ",
      externalLink: "https://open.spotify.com/track/2kqpwVLLYRuiYm8J8M4RrZ",
    },
  ],
} as const satisfies Track
