import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHere = {
  id: "01a0676a-d72c-701e-b1fb-569fc0bce200",
  type: "page-type/release",
  slug: "james-taylor-2-that-s-why-i-m-here",
  title: "That's Why I'm Here",
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  ownLength: 39.439717,
  ownProgress: 39.439717,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1985-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "24C7QcqwW2DvYgGiQeNTr6",
      externalLink: "https://open.spotify.com/album/24C7QcqwW2DvYgGiQeNTr6",
    },
  ],
} as const satisfies Release
