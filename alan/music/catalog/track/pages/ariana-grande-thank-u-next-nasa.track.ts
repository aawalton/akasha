import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextNasa = {
  id: "01a0a6c5-279f-7880-a45d-db1f58faf61a",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-nasa",
  ownLength: 3.033333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4uTvPEr01pjTbZgl7jcKBD",
      externalLink: "https://open.spotify.com/track/4uTvPEr01pjTbZgl7jcKBD",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "NASA",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "nasa|66CXWjxzNUsdJxJ2JdwvnR|182000",
} as const satisfies Track
