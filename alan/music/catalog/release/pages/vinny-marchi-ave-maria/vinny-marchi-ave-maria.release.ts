import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiAveMaria = {
  id: "01a0676a-d717-7042-a4b8-20a74449fc2d",
  type: "page-type/release",
  slug: "vinny-marchi-ave-maria",
  title: "Ave Maria",
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  ownLength: 3.9335,
  ownProgress: 3.9335,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-02-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bRNaudGi0yWnya0j80HG5",
      externalLink: "https://open.spotify.com/album/2bRNaudGi0yWnya0j80HG5",
      lastSyncedAt: "2025-10-24",
    },
  ],
} as const satisfies Release
