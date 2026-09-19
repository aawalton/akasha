import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFixYou2FixYou = {
  id: "01a0b9ee-ff5c-7e2e-96a2-fa4928c908a7",
  type: "page-type/track",
  slug: "coldplay-fix-you-2-fix-you",
  ownLength: 4.623333333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-fix-you-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6YAbIZPjyQ5euHxyxUgRoQ",
      externalLink: "https://open.spotify.com/track/6YAbIZPjyQ5euHxyxUgRoQ",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fix You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "fixyou|4gzpq5DPGxSnKTe4SA8HAU|277400",
  song: "song/coldplay-fix-you",
} as const satisfies Track
