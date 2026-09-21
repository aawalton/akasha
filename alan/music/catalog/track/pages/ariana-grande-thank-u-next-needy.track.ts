import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextNeedy = {
  id: "01a0a6c5-2778-7ae5-b5bd-e616a82a2fc2",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-needy",
  ownLength: 2.85955,
  ownProgress: 2.85955,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1TEL6MlSSVLSdhOSddidlJ",
      externalLink: "https://open.spotify.com/track/1TEL6MlSSVLSdhOSddidlJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "needy",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "needy|66CXWjxzNUsdJxJ2JdwvnR|171573",
  song: "song/ariana-grande-needy",
  carriedBy: [
    {
      release: "release/ariana-grande-thank-u-next",
      discNumber: 1,
      position: 2,
      externalId: "1TEL6MlSSVLSdhOSddidlJ",
      externalLink: "https://open.spotify.com/track/1TEL6MlSSVLSdhOSddidlJ",
    },
  ],
} as const satisfies Track
