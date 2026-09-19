import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTheWay = {
  id: "01a0a6c5-3052-7a07-b78d-9568513e9866",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-the-way",
  ownLength: 3.7837666666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06EL94D0TA27Ik0Ke5usbj",
      externalLink: "https://open.spotify.com/track/06EL94D0TA27Ik0Ke5usbj",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Way",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "4LLpKhyESsyAXpc4laK94U", artistName: "Mac Miller" },
  ],
  trackKey: "theway|4LLpKhyESsyAXpc4laK94U,66CXWjxzNUsdJxJ2JdwvnR|227026",
  song: "song/ariana-grande-the-way",
} as const satisfies Track
