import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndEdit = {
  id: "01a0a6c5-348e-735b-930c-56271e410399",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-edit",
  ownLength: 3.1792333333333334,
  ownProgress: 3.1792333333333334,
  partOfCollections: ["release/ariana-grande-yes-and"],
  status: "completed",
  unit: "unit/minutes",
  title: "yes, and? - edit",
  trackType: "version",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "yesandedit|66CXWjxzNUsdJxJ2JdwvnR|190754",
  song: "song/ariana-grande-yes-and",
  carriedBy: [
    {
      release: "release/ariana-grande-yes-and",
      discNumber: 1,
      position: 2,
      externalId: "5wiAFvYjgrzxlyYxDXP155",
      externalLink: "https://open.spotify.com/track/5wiAFvYjgrzxlyYxDXP155",
    },
  ],
} as const satisfies Track
