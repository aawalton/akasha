import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalStay = {
  id: "01a0a6c5-0444-725d-bf6b-c73e25ae718f",
  type: "page-type/track",
  slug: "ariana-grande-petal-stay",
  ownLength: 2.4736666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0QltPqkR4dnhbINyBOU5SY",
      externalLink: "https://open.spotify.com/track/0QltPqkR4dnhbINyBOU5SY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "stay",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "stay|66CXWjxzNUsdJxJ2JdwvnR|148420",
  song: "song/ariana-grande-stay",
} as const satisfies Track
