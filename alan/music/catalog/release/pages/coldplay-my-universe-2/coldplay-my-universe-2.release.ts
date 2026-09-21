import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMyUniverse2 = {
  id: "01a0676a-d725-7038-91fa-44c5a372d4d7",
  type: "page-type/release",
  slug: "coldplay-my-universe-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-09-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "39McjovZ3M6n5SFtNmWTdp",
      externalLink: "https://open.spotify.com/album/39McjovZ3M6n5SFtNmWTdp",
    },
  ],
  title: "My Universe",
} as const satisfies Release
