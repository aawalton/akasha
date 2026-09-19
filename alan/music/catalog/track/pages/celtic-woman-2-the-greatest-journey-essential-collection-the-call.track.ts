import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollectionTheCall = {
  id: "01a0abea-7d51-77af-93e7-f56daf3625bd",
  type: "page-type/track",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection-the-call",
  ownLength: 4.293333333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-greatest-journey-essential-collection"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1mxxFJEsvjbp6CkixYvqYd",
      externalLink: "https://open.spotify.com/track/1mxxFJEsvjbp6CkixYvqYd",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Call",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thecall|6NWtt9pNOL2Gx7kBykdE5x|257600",
  song: "song/celtic-woman-the-call",
} as const satisfies Track
