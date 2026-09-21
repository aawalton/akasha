import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyTenthAnniversaryEditionTheWayLiveFromLondonFeatMacMiller = {
  id: "01a0a6c5-1ec1-7072-89e2-fbca37b9e8bc",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-tenth-anniversary-edition-the-way-live-from-london-feat-mac-miller",
  ownLength: 3.5615666666666668,
  ownProgress: 3.5615666666666668,
  partOfCollections: ["release/ariana-grande-yours-truly-tenth-anniversary-edition"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4VUp83ibStl36qC7UOxGkF",
      externalLink: "https://open.spotify.com/track/4VUp83ibStl36qC7UOxGkF",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Way - Live from London (feat. Mac Miller)",
  trackType: "live",
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "4LLpKhyESsyAXpc4laK94U", artistName: "Mac Miller" },
  ],
  trackKey:
    "thewaylivefromlondonfeatmacmiller|4LLpKhyESsyAXpc4laK94U,66CXWjxzNUsdJxJ2JdwvnR|213694",
  song: "song/ariana-grande-the-way",
  carriedBy: [
    {
      release: "release/ariana-grande-yours-truly-tenth-anniversary-edition",
      discNumber: 1,
      position: 19,
      externalId: "4VUp83ibStl36qC7UOxGkF",
      externalLink: "https://open.spotify.com/track/4VUp83ibStl36qC7UOxGkF",
    },
  ],
} as const satisfies Track
