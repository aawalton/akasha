import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandGardenOfEden = {
  id: "01a0abea-5d5d-7378-b61d-a015af2e4f0e",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-garden-of-eden",
  ownLength: 3.39755,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5yiIItWLpYtH9eoXE3Tjxf",
      externalLink: "https://open.spotify.com/track/5yiIItWLpYtH9eoXE3Tjxf",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Garden Of Eden",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "gardenofeden|6NWtt9pNOL2Gx7kBykdE5x|203853",
  song: "song/celtic-woman-garden-of-eden",
} as const satisfies Track
