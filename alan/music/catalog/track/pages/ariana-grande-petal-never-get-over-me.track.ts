import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalNeverGetOverMe = {
  id: "01a0a6c5-050c-7aa2-974d-68fa306792ea",
  type: "page-type/track",
  slug: "ariana-grande-petal-never-get-over-me",
  ownLength: 3.8142833333333335,
  ownProgress: 3.8142833333333335,
  partOfCollections: ["release/ariana-grande-petal"],
  status: "completed",
  unit: "unit/minutes",
  title: "never get over me",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "nevergetoverme|66CXWjxzNUsdJxJ2JdwvnR|228857",
  song: "song/ariana-grande-never-get-over-me",
  carriedBy: [
    {
      release: "release/ariana-grande-petal",
      discNumber: 1,
      position: 10,
      externalId: "55srcWA7TioKV0LZVNXltY",
      externalLink: "https://open.spotify.com/track/55srcWA7TioKV0LZVNXltY",
    },
  ],
} as const satisfies Track
