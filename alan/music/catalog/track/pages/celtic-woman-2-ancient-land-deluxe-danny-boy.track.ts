import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandDeluxeDannyBoy = {
  id: "01a0abea-5b83-7126-95cd-6c7518e1aede",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-deluxe-danny-boy",
  ownLength: 3.5366666666666666,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land-deluxe"],
  position: 26,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "565yQRDDmkCcsyfhEnsjS9",
      externalLink: "https://open.spotify.com/track/565yQRDDmkCcsyfhEnsjS9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Danny Boy",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "dannyboy|6NWtt9pNOL2Gx7kBykdE5x|212200",
  song: "song/celtic-woman-danny-boy",
} as const satisfies Track
