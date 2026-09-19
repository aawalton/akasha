import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePetalNeverGetOverMe = {
  id: "01a0a6c5-050c-7aa2-974d-68fa306792ea",
  type: "page-type/track",
  slug: "ariana-grande-petal-never-get-over-me",
  ownLength: 3.8142833333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-petal"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55srcWA7TioKV0LZVNXltY",
      externalLink: "https://open.spotify.com/track/55srcWA7TioKV0LZVNXltY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "never get over me",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "nevergetoverme|66CXWjxzNUsdJxJ2JdwvnR|228857",
  song: "song/ariana-grande-never-get-over-me",
} as const satisfies Track
