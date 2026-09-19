import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextInMyHead = {
  id: "01a0a6c5-287c-7b60-b833-10a914a71330",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-in-my-head",
  ownLength: 3.7157666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4T652DlATVHe0jdLKaN3Bw",
      externalLink: "https://open.spotify.com/track/4T652DlATVHe0jdLKaN3Bw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "in my head",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "inmyhead|66CXWjxzNUsdJxJ2JdwvnR|222946",
  song: "song/ariana-grande-in-my-head",
} as const satisfies Track
