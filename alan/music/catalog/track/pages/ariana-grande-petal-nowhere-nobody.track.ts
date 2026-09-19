import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalNowhereNobody = {
  id: "01a0a6c5-0544-7e64-a921-17c131fe95af",
  type: "page-type/track",
  slug: "ariana-grande-petal-nowhere-nobody",
  ownLength: 2.8666833333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5JbnupagBhD0AanbkCELdH",
      externalLink: "https://open.spotify.com/track/5JbnupagBhD0AanbkCELdH",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "nowhere, nobody",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "nowherenobody|66CXWjxzNUsdJxJ2JdwvnR|172001",
  song: "song/ariana-grande-nowhere-nobody",
} as const satisfies Track
