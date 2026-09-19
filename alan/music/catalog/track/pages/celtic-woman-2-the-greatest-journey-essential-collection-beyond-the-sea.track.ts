import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollectionBeyondTheSea = {
  id: "01a0abea-7f0e-7b81-8017-08078ccea9f9",
  type: "page-type/track",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection-beyond-the-sea",
  ownLength: 3.326216666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-greatest-journey-essential-collection"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Z4JkypVdmfjc8Z0VROzAA",
      externalLink: "https://open.spotify.com/track/5Z4JkypVdmfjc8Z0VROzAA",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Beyond The Sea",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "beyondthesea|6NWtt9pNOL2Gx7kBykdE5x|199573",
  song: "song/celtic-woman-beyond-the-sea",
} as const satisfies Track
