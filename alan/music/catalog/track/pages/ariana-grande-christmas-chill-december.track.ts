import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasChillDecember = {
  id: "01a0a6c5-3a27-744f-bfa0-94e89967313a",
  type: "page-type/track",
  slug: "ariana-grande-christmas-chill-december",
  ownLength: 1.9376833333333334,
  ownProgress: 1.9376833333333334,
  partOfCollections: ["release/ariana-grande-christmas-chill"],
  status: "completed",
  unit: "unit/minutes",
  title: "December",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "december|66CXWjxzNUsdJxJ2JdwvnR|116261",
  song: "song/ariana-grande-december",
  carriedBy: [
    {
      release: "release/ariana-grande-christmas-chill",
      discNumber: 1,
      position: 3,
      externalId: "6nx2z3uGS0LhvRor8LpoIb",
      externalLink: "https://open.spotify.com/track/6nx2z3uGS0LhvRor8LpoIb",
    },
  ],
} as const satisfies Track
