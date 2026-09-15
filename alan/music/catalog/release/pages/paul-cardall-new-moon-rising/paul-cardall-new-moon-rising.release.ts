import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallNewMoonRising = {
  id: "01a0676a-d725-7052-b846-790988ab93e1",
  type: "page-type/release",
  slug: "paul-cardall-new-moon-rising",
  title: "New Moon Rising",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 3.62155,
  ownProgress: 3.62155,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yP3aw60J3gTniESqLjTNR",
      externalLink: "https://open.spotify.com/album/3yP3aw60J3gTniESqLjTNR",
    },
  ],
} as const satisfies Release
