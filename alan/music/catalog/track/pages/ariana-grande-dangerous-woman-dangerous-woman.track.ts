import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeDangerousWomanDangerousWoman = {
  id: "01a0a6c5-2b35-726c-b783-f1fb3d605b6a",
  type: "page-type/track",
  slug: "ariana-grande-dangerous-woman-dangerous-woman",
  ownLength: 3.9324333333333334,
  ownProgress: 3.9324333333333334,
  partOfCollections: ["release/ariana-grande-dangerous-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Dangerous Woman",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "dangerouswoman|66CXWjxzNUsdJxJ2JdwvnR|235946",
  song: "song/ariana-grande-dangerous-woman",
  carriedBy: [
    {
      release: "release/ariana-grande-dangerous-woman",
      discNumber: 1,
      position: 2,
      externalId: "1OhstguCoBQ4SXT8ugSmOl",
      externalLink: "https://open.spotify.com/track/1OhstguCoBQ4SXT8ugSmOl",
    },
  ],
} as const satisfies Track
