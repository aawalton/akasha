import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollectionAveMaria = {
  id: "01a0abea-7eb4-7445-b440-2c13e9dd6315",
  type: "page-type/track",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection-ave-maria",
  ownLength: 2.8699833333333333,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-greatest-journey-essential-collection"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QS6YPHz807ohnNEr05mKh",
      externalLink: "https://open.spotify.com/track/6QS6YPHz807ohnNEr05mKh",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ave Maria",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "avemaria|6NWtt9pNOL2Gx7kBykdE5x|172199",
  song: "song/celtic-woman-ave-maria",
} as const satisfies Track
