import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonAllIEverWantedAlreadyGone = {
  id: "01a0a5ae-c822-7dd4-8bbe-7d12433da630",
  type: "page-type/track",
  slug: "kelly-clarkson-all-i-ever-wanted-already-gone",
  ownLength: 4.692666666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-all-i-ever-wanted"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4fq2YUONcgrCJ2SPndSeKC",
      externalLink: "https://open.spotify.com/track/4fq2YUONcgrCJ2SPndSeKC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Already Gone",
} as const satisfies Track
