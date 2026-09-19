import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionYouDontKnowMe = {
  id: "01a0a6c5-1808-78cb-b8cd-b5db1ab294cd",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-you-dont-know-me",
  ownLength: 3.8950833333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-tenth-anniversary-edition"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3PCklyrrpEDpbSEzO5nPo0",
      externalLink: "https://open.spotify.com/track/3PCklyrrpEDpbSEzO5nPo0",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "You Don't Know Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "youdontknowme|66CXWjxzNUsdJxJ2JdwvnR|233705",
  song: "song/ariana-grande-you-don-t-know-me",
} as const satisfies Track
