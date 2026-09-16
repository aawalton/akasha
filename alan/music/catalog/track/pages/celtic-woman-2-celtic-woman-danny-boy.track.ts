import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanDannyBoy = {
  id: "01a0abea-7889-7ba6-b059-e2a165a8b26b",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-danny-boy",
  ownLength: 3.407766666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "75sSAymXP6tGOeRvImwzOf",
      externalLink: "https://open.spotify.com/track/75sSAymXP6tGOeRvImwzOf",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Danny Boy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "dannyboy|6NWtt9pNOL2Gx7kBykdE5x|204466",
} as const satisfies Track
