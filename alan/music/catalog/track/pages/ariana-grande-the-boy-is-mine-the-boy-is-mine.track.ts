import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeTheBoyIsMineTheBoyIsMine = {
  id: "01a0a6c5-32a0-74b4-9b9c-3abdcdc4f39c",
  type: "page-type/track",
  slug: "ariana-grande-the-boy-is-mine-the-boy-is-mine",
  ownLength: 2.8939833333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-the-boy-is-mine"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "38JweSPC9JTirnqgFOchCM",
      externalLink: "https://open.spotify.com/track/38JweSPC9JTirnqgFOchCM",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "the boy is mine",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "theboyismine|66CXWjxzNUsdJxJ2JdwvnR|173639",
  song: "song/ariana-grande-the-boy-is-mine-2",
} as const satisfies Track
