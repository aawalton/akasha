import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2Millennium20 = {
  id: "01a0676a-d724-7069-b83f-de2687bea36e",
  type: "page-type/release",
  slug: "backstreet-boys-2-millennium-2-0",
  title: "Millennium 2.0",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 100.312317,
  ownProgress: 100.312317,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-07-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3SF8AL4ixgmeeqYg7iMTfW",
      externalLink: "https://open.spotify.com/album/3SF8AL4ixgmeeqYg7iMTfW",
    },
  ],
} as const satisfies Release
