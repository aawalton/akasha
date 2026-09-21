import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishLoVasAOlvidarWithRosalia = {
  id: "01a0676a-d723-705c-9cbb-9a637893cdc1",
  type: "page-type/release",
  slug: "billie-eilish-lo-vas-a-olvidar-with-rosalia",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2021-01-21",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4E8puNI8tw7cXz6YJkwMew",
      externalLink: "https://open.spotify.com/album/4E8puNI8tw7cXz6YJkwMew",
    },
  ],
  title: "Lo Vas A Olvidar (with ROSALÍA)",
} as const satisfies Release
