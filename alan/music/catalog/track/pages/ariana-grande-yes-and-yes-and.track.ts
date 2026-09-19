import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAnd = {
  id: "01a0a6c5-3470-7440-a27d-9c2824e7c5a7",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and",
  ownLength: 3.5832333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ckw25vIQjnbN03XRwp55B",
      externalLink: "https://open.spotify.com/track/2ckw25vIQjnbN03XRwp55B",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and?",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesand|66CXWjxzNUsdJxJ2JdwvnR|214994",
  song: "song/ariana-grande-yes-and",
} as const satisfies Track
