import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeKByeForNowSwtLiveFakeSmileLive = {
  id: "01a0a6c5-24a8-7f8e-bdbd-0dc88cc588ce",
  type: "page-type/track",
  slug: "ariana-grande-k-bye-for-now-swt-live-fake-smile-live",
  ownLength: 3.426433333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-k-bye-for-now-swt-live"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5BYts42mYfuullBbELoaEV",
      externalLink: "https://open.spotify.com/track/5BYts42mYfuullBbELoaEV",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "fake smile - live",
  trackType: "live",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "fakesmilelive|66CXWjxzNUsdJxJ2JdwvnR|205586",
  song: "song/ariana-grande-fake-smile",
} as const satisfies Track
