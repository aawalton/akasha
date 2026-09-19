import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeShenandoah = {
  id: "01a0abea-5956-7a7c-aa9b-05c5503123d2",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-shenandoah",
  ownLength: 4.1171,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Pl2TWrYtTvenhOog129Dc",
      externalLink: "https://open.spotify.com/track/5Pl2TWrYtTvenhOog129Dc",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Shenandoah",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "shenandoah|6NWtt9pNOL2Gx7kBykdE5x|247026",
  song: "song/celtic-woman-shenandoah",
} as const satisfies Track
