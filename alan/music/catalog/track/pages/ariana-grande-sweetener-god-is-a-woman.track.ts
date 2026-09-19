import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSweetenerGodIsAWoman = {
  id: "01a0a6c5-2997-7df2-9c4f-da7fdec60e7f",
  type: "page-type/track",
  slug: "ariana-grande-sweetener-god-is-a-woman",
  ownLength: 3.2924333333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-sweetener"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5OCJzvD7sykQEKHH7qAC3C",
      externalLink: "https://open.spotify.com/track/5OCJzvD7sykQEKHH7qAC3C",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "God is a woman",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "godisawoman|66CXWjxzNUsdJxJ2JdwvnR|197546",
  song: "song/ariana-grande-god-is-a-woman",
} as const satisfies Track
