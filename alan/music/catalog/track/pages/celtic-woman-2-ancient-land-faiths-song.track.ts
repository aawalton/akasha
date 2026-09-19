import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandFaithsSong = {
  id: "01a0abea-5d44-7124-b690-181d05f7dd82",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-faiths-song",
  ownLength: 4.05555,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0bGTNgq8V3xrbAXN4YDdOf",
      externalLink: "https://open.spotify.com/track/0bGTNgq8V3xrbAXN4YDdOf",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Faith’s Song",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "faithssong|6NWtt9pNOL2Gx7kBykdE5x|243333",
  song: "song/celtic-woman-faiths-song",
} as const satisfies Track
