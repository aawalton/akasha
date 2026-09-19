import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandAncientLand = {
  id: "01a0abea-5bc3-7d13-a66f-158702543b52",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-ancient-land",
  ownLength: 2.72155,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4IgfP7j1bjIzKBbtOnwthY",
      externalLink: "https://open.spotify.com/track/4IgfP7j1bjIzKBbtOnwthY",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ancient Land",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "ancientland|6NWtt9pNOL2Gx7kBykdE5x|163293",
  song: "song/celtic-woman-ancient-land",
} as const satisfies Track
