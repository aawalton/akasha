import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraToBeLoved = {
  id: "01a0676a-d72f-7003-abf1-36d94e13d1f3",
  type: "page-type/release",
  slug: "aurora-to-be-loved",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2019-09-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1RxibJSLV6FDm0TWyfA3mF",
      externalLink: "https://open.spotify.com/album/1RxibJSLV6FDm0TWyfA3mF",
    },
  ],
  title: "To Be Loved",
} as const satisfies Release
