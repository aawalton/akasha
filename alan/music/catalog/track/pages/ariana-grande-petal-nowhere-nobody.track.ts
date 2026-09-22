import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalNowhereNobody = {
  id: "01a0a6c5-0544-7e64-a921-17c131fe95af",
  type: "page-type/track",
  slug: "ariana-grande-petal-nowhere-nobody",
  ownLength: 2.8666833333333335,
  ownProgress: 2.8666833333333335,
  partOfCollections: ["release/ariana-grande-petal"],
  status: "completed",
  unit: "unit/minutes",
  title: "nowhere, nobody",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "nowherenobody|66CXWjxzNUsdJxJ2JdwvnR|172001",
  song: "song/ariana-grande-nowhere-nobody",
  carriedBy: [
    {
      release: "release/ariana-grande-petal",
      discNumber: 1,
      position: 12,
      externalId: "5JbnupagBhD0AanbkCELdH",
      externalLink: "https://open.spotify.com/track/5JbnupagBhD0AanbkCELdH",
    },
  ],
} as const satisfies Track
