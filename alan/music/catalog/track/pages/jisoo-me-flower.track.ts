import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooMeFlower = {
  id: "01a0afa2-7394-7975-897a-31065e855c0e",
  type: "page-type/track",
  slug: "jisoo-me-flower",
  ownLength: 2.8855666666666666,
  ownProgress: 2.8855666666666666,
  partOfCollections: ["release/jisoo-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "FLOWER",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jisoo" }],
  trackKey: "flower|6UZ0ba50XreR4TM8u322gs|173134",
  song: "song/jisoo-flower",
  carriedBy: [
    {
      release: "release/jisoo-me",
      discNumber: 1,
      position: 1,
      externalId: "69CrOS7vEHIrhC2ILyEi0s",
      externalLink: "https://open.spotify.com/track/69CrOS7vEHIrhC2ILyEi0s",
    },
  ],
} as const satisfies Track
