import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaComfortJoy = {
  id: "01a0676a-d71b-701d-8eb5-2ee1887e3355",
  type: "page-type/release",
  slug: "rockapella-comfort-joy",
  title: "Comfort & Joy",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2002-11-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2tMv57b5M2KxjuT3LFsrzz",
      externalLink: "https://open.spotify.com/album/2tMv57b5M2KxjuT3LFsrzz",
    },
  ],
} as const satisfies Release
