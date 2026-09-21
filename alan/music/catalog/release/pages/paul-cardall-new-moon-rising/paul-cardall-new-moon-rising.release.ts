import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallNewMoonRising = {
  id: "01a0676a-d725-7052-b846-790988ab93e1",
  type: "page-type/release",
  slug: "paul-cardall-new-moon-rising",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2021-10-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yP3aw60J3gTniESqLjTNR",
      externalLink: "https://open.spotify.com/album/3yP3aw60J3gTniESqLjTNR",
    },
  ],
  title: "New Moon Rising",
} as const satisfies Release
