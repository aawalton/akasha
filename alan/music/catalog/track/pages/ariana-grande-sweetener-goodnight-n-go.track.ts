import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerGoodnightNGo = {
  id: "01a0a6c5-2a9a-7f85-85ad-80cb45043af5",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-goodnight-n-go",
  ownLength: 3.1584333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "14kYOiFVPb7E7NfFbqhdln",
      externalLink: "https://open.spotify.com/track/14kYOiFVPb7E7NfFbqhdln",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "goodnight n go",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "goodnightngo|66CXWjxzNUsdJxJ2JdwvnR|189506",
} as const satisfies Track
