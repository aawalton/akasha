import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTenthAnniversaryEditionTheWayFeatMacMiller = {
  id: "01a0a6c5-1d45-7bbc-a70b-b55b10b8104e",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tenth-anniversary-edition-the-way-feat-mac-miller",
  ownLength: 3.7838833333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly-tenth-anniversary-edition"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Onx2O64wzyA7ZzOsBBqBJ",
      externalLink: "https://open.spotify.com/track/1Onx2O64wzyA7ZzOsBBqBJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Way (feat. Mac Miller)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "4LLpKhyESsyAXpc4laK94U", artistName: "Mac Miller" },
  ],
  trackKey: "thewayfeatmacmiller|4LLpKhyESsyAXpc4laK94U,66CXWjxzNUsdJxJ2JdwvnR|227033",
  song: "song/ariana-grande-the-way",
} as const satisfies Track
