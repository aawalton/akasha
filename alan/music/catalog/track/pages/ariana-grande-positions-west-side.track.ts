import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsWestSide = {
  id: "01a0a6c5-2247-71dc-bcdb-a2d7cfb1d392",
  type: "page-type/track",
  slug: "ariana-grande-positions-west-side",
  ownLength: 2.2046333333333332,
  ownProgress: 2.2046333333333332,
  partOfCollections: ["release/ariana-grande-positions"],
  position: 10,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1whfVLMKWqAX3uk97VXsNN",
      externalLink: "https://open.spotify.com/track/1whfVLMKWqAX3uk97VXsNN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "west side",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "westside|66CXWjxzNUsdJxJ2JdwvnR|132278",
  song: "song/ariana-grande-west-side",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 10,
      externalId: "1whfVLMKWqAX3uk97VXsNN",
      externalLink: "https://open.spotify.com/track/1whfVLMKWqAX3uk97VXsNN",
    },
  ],
} as const satisfies Track
