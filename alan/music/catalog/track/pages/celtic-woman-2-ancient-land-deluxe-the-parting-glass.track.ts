import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeThePartingGlass = {
  id: "01a0abea-5ba4-7316-8673-ed8572e09a6a",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-the-parting-glass",
  ownLength: 4.524216666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 27,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6p3B4brQa6Hs7G2CAqCpju",
      externalLink: "https://open.spotify.com/track/6p3B4brQa6Hs7G2CAqCpju",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Parting Glass",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thepartingglass|6NWtt9pNOL2Gx7kBykdE5x|271453",
  song: "song/celtic-woman-the-parting-glass",
} as const satisfies Track
