import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerTheLightIsComingFeatNickiMinaj = {
  id: "01a0a6c5-2958-7f50-b41c-9e2495cd7cd4",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-the-light-is-coming-feat-nicki-minaj",
  ownLength: 3.806216666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0sdbFOyfgAhAhWq8DpzkaW",
      externalLink: "https://open.spotify.com/track/0sdbFOyfgAhAhWq8DpzkaW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "the light is coming (feat. Nicki Minaj)",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0hCNtLu0JehylgoiP8L4Gh", artistName: "Nicki Minaj" },
  ],
  trackKey: "thelightiscomingfeatnickiminaj|0hCNtLu0JehylgoiP8L4Gh,66CXWjxzNUsdJxJ2JdwvnR|228373",
  song: "song/ariana-grande-the-light-is-coming",
} as const satisfies Track
