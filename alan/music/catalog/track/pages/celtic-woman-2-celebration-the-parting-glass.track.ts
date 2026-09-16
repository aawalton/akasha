import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelebrationThePartingGlass = {
  id: "01a0abea-5688-7464-a338-bcc16642fae8",
  type: "page-type/track",
  slug: "celtic-woman-2-celebration-the-parting-glass",
  ownLength: 4.5411,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celebration"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2LvGE9gWeFfDZMWRLUfays",
      externalLink: "https://open.spotify.com/track/2LvGE9gWeFfDZMWRLUfays",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Parting Glass",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thepartingglass|6NWtt9pNOL2Gx7kBykdE5x|272466",
} as const satisfies Track
