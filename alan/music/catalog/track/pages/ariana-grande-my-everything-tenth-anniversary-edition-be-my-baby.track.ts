import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionBeMyBaby = {
  id: "01a0a6c5-16ed-7fdd-96e9-b4007e8391ca",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-be-my-baby",
  ownLength: 3.6175,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0BFkaHSK8Irpp9KX7XUsvd",
      externalLink: "https://open.spotify.com/track/0BFkaHSK8Irpp9KX7XUsvd",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Be My Baby",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "2LZDXcxJWgsJfKXZv9a5eG", artistName: "Cashmere Cat" },
  ],
  trackKey: "bemybaby|2LZDXcxJWgsJfKXZv9a5eG,66CXWjxzNUsdJxJ2JdwvnR|217050",
} as const satisfies Track
