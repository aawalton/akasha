import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandSive = {
  id: "01a0abea-5ca4-7b32-928f-24b3b0c951f9",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-sive",
  ownLength: 3.1728833333333335,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5voZZIKoVrjNTAyl9Grr7A",
      externalLink: "https://open.spotify.com/track/5voZZIKoVrjNTAyl9Grr7A",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sive",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "sive|6NWtt9pNOL2Gx7kBykdE5x|190373",
  song: "song/celtic-woman-sive",
} as const satisfies Track
