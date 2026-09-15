import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeBangBangRemixesBangBang3lauRemix = {
  id: "01a0a6c5-3bb5-7834-8c1b-6a64e754fe03",
  type: "page-type/track",
  slug: "ariana-grande-bang-bang-remixes-bang-bang-3lau-remix",
  ownLength: 3.10555,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-bang-bang-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4kXDTeaXTJGRlyGQ15fhvA",
      externalLink: "https://open.spotify.com/track/4kXDTeaXTJGRlyGQ15fhvA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bang Bang - 3LAU Remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2gsggkzM5R49q6jpPvazou", artistName: "Jessie J" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
  ],
  trackKey:
    "bangbang3lauremix|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|186333",
} as const satisfies Track
