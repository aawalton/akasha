import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeBangBang = {
  id: "01a0a6c5-2f07-7955-8461-d877072be85c",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-bang-bang",
  ownLength: 3.322,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "466s1BacUmiRdR3ISvNjyx",
      externalLink: "https://open.spotify.com/track/466s1BacUmiRdR3ISvNjyx",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bang Bang",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2gsggkzM5R49q6jpPvazou", artistName: "Jessie J" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
  ],
  trackKey: "bangbang|0hCNtLu0JehylgoiP8L4Gh,2gsggkzM5R49q6jpPvazou,66CXWjxzNUsdJxJ2JdwvnR|199320",
} as const satisfies Track
