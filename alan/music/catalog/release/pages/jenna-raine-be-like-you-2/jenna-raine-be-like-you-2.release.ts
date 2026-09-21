import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineBeLikeYou2 = {
  id: "01a0676a-d718-701d-9e0d-a9cf4cea2624",
  type: "page-type/release",
  slug: "jenna-raine-be-like-you-2",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2019-11-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3WvSgPoWQIvNIKiRk8TMga",
      externalLink: "https://open.spotify.com/album/3WvSgPoWQIvNIKiRk8TMga",
    },
  ],
  title: "Be Like You",
} as const satisfies Release
