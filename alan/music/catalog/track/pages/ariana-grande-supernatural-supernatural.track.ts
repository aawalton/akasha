import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSupernaturalSupernatural = {
  id: "01a0a6c5-3109-7bc5-8510-dc378042df1a",
  type: "page-type/track",
  slug: "ariana-grande-supernatural-supernatural",
  ownLength: 2.7230166666666666,
  ownProgress: 2.7230166666666666,
  partOfCollections: ["release/ariana-grande-supernatural"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Tfrr45yeatPJJts3NkOBS",
      externalLink: "https://open.spotify.com/track/5Tfrr45yeatPJJts3NkOBS",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "supernatural",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "supernatural|66CXWjxzNUsdJxJ2JdwvnR|163381",
  song: "song/ariana-grande-supernatural",
  carriedBy: [
    {
      release: "release/ariana-grande-supernatural",
      discNumber: 1,
      position: 1,
      externalId: "5Tfrr45yeatPJJts3NkOBS",
      externalLink: "https://open.spotify.com/track/5Tfrr45yeatPJJts3NkOBS",
    },
  ],
} as const satisfies Track
