import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsDemons = {
  id: "01a0676a-d71c-7009-92ef-e7407bcd7521",
  type: "page-type/release",
  slug: "imagine-dragons-demons",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2013-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3nfXIZGZlIgaLRx52fABmG",
      externalLink: "https://open.spotify.com/album/3nfXIZGZlIgaLRx52fABmG",
    },
  ],
  title: "Demons",
} as const satisfies Release
