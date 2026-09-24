import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillTrueLove = {
  id: "01a0a6c5-3a69-7b74-8554-fb7c9c594af7",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-true-love",
  ownLength: 2.7706166666666667,
  ownProgress: 2.7706166666666667,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "True Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "truelove|66CXWjxzNUsdJxJ2JdwvnR|166237",
  song: "song/ariana-grande-true-love",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-chill",
      discNumber: 1,
      position: 5,
      externalId: "02E2iNkWn6VTWWfbwrN7tY",
      externalLink: "https://open.spotify.com/track/02E2iNkWn6VTWWfbwrN7tY",
    },
  ],
} as const satisfies Track
