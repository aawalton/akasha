import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2AncientLandTarasTunes = {
  id: "01a0abea-5d04-7662-a84e-5ef39eeb3b62",
  type: "page-type/track",
  slug: "celtic-woman-2-ancient-land-taras-tunes",
  ownLength: 4.248883333333334,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-ancient-land"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3aGiYndzAVhVa51kIe1bTd",
      externalLink: "https://open.spotify.com/track/3aGiYndzAVhVa51kIe1bTd",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Tara’s Tunes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "tarastunes|6NWtt9pNOL2Gx7kBykdE5x|254933",
} as const satisfies Track
