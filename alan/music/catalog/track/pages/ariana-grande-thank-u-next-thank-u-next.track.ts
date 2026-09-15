import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextThankUNext = {
  id: "01a0a6c5-28c5-77ce-b06e-190652714c8b",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-thank-u-next",
  ownLength: 3.4553333333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3e9HZxeyfWwjeyPAMmWSSQ",
      externalLink: "https://open.spotify.com/track/3e9HZxeyfWwjeyPAMmWSSQ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "thank u, next",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "thankunext|66CXWjxzNUsdJxJ2JdwvnR|207320",
} as const satisfies Track
