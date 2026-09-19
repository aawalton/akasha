import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeChristmasKissesSnowInCalifornia = {
  id: "01a0a6c5-3e4e-7f62-a2ae-6a71a9239952",
  type: "page-type/track",
  slug: "ariana-grande-christmas-kisses-snow-in-california",
  ownLength: 3.43955,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-christmas-kisses"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Uc4EHr3ktYmLfLDY7LifJ",
      externalLink: "https://open.spotify.com/track/6Uc4EHr3ktYmLfLDY7LifJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Snow In California",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "snowincalifornia|66CXWjxzNUsdJxJ2JdwvnR|206373",
  song: "song/ariana-grande-snow-in-california",
} as const satisfies Track
