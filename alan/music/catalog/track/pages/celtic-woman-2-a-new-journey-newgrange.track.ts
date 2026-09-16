import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyNewgrange = {
  id: "01a0abea-7474-7104-8de0-45bbe3043366",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-newgrange",
  ownLength: 3.1251,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5N5sHFKi47SjQASUnxNZVO",
      externalLink: "https://open.spotify.com/track/5N5sHFKi47SjQASUnxNZVO",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Newgrange",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "newgrange|6NWtt9pNOL2Gx7kBykdE5x|187506",
} as const satisfies Track
