import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiAveMaria = {
  id: "01a0676a-d717-7042-a4b8-20a74449fc2d",
  type: "page-type/release",
  slug: "vinny-marchi-ave-maria",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-02-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bRNaudGi0yWnya0j80HG5",
      externalLink: "https://open.spotify.com/album/2bRNaudGi0yWnya0j80HG5",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Ave Maria",
} as const satisfies Release
