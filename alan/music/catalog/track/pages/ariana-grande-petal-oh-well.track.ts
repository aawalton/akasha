import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalOhWell = {
  id: "01a0a6c5-0467-7862-878c-a08ac778d43d",
  type: "page-type/track",
  slug: "ariana-grande-petal-oh-well",
  ownLength: 3.269433333333333,
  ownProgress: 3.269433333333333,
  partOfCollections: ["release/ariana-grande-petal"],
  status: "completed",
  unit: "unit/minutes",
  title: "oh well",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "ohwell|66CXWjxzNUsdJxJ2JdwvnR|196166",
  song: "song/ariana-grande-oh-well",
  carriedBy: [
    {
      release: "release/ariana-grande-petal",
      discNumber: 1,
      position: 5,
      externalId: "5DZOKNtaoVEssXu9ltcMjx",
      externalLink: "https://open.spotify.com/track/5DZOKNtaoVEssXu9ltcMjx",
    },
  ],
  createdAt: "2026-09-15T20:32:04.711Z",
  updatedAt: "2026-09-24T19:58:28.000Z",
} as const satisfies Track
