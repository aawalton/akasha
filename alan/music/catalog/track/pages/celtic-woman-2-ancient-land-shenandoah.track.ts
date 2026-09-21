import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandShenandoah = {
  id: "01a0abea-5cc5-7f76-96ab-af447968d3b4",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-shenandoah",
  ownLength: 4.1171,
  ownProgress: 4.1171,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1DVeGmNt0WVYgBvyxTTkyR",
      externalLink: "https://open.spotify.com/track/1DVeGmNt0WVYgBvyxTTkyR",
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
  carriedBy: [
    {
      release: "release/celtic-woman-2-ancient-land",
      discNumber: 1,
      position: 9,
      externalId: "1DVeGmNt0WVYgBvyxTTkyR",
      externalLink: "https://open.spotify.com/track/1DVeGmNt0WVYgBvyxTTkyR",
    },
  ],
} as const satisfies Track
