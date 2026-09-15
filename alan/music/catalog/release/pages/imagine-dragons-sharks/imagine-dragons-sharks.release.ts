import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsSharks = {
  id: "01a0676a-d728-706e-9d09-e6068d4164d8",
  type: "page-type/release",
  slug: "imagine-dragons-sharks",
  title: "Sharks",
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  ownLength: 3.181383,
  ownProgress: 3.181383,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-06-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "587Ykd8NOCdzRmaW4nlT4e",
      externalLink: "https://open.spotify.com/album/587Ykd8NOCdzRmaW4nlT4e",
    },
  ],
} as const satisfies Release
