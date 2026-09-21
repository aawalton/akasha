import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHere = {
  id: "01a0676a-d72c-701e-b1fb-569fc0bce200",
  type: "page-type/release",
  slug: "james-taylor-2-that-s-why-i-m-here",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1985-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "24C7QcqwW2DvYgGiQeNTr6",
      externalLink: "https://open.spotify.com/album/24C7QcqwW2DvYgGiQeNTr6",
    },
  ],
  title: "That's Why I'm Here",
} as const satisfies Release
