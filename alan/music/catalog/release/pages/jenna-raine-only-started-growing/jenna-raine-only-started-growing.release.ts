import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineOnlyStartedGrowing = {
  id: "01a0676a-d726-7038-a5cb-0ac4d4a48014",
  type: "page-type/release",
  slug: "jenna-raine-only-started-growing",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2025-04-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7HcrXJXrfaPrXzPnZggZoC",
      externalLink: "https://open.spotify.com/album/7HcrXJXrfaPrXzPnZggZoC",
    },
  ],
  title: "Only Started Growing",
} as const satisfies Release
