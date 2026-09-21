import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineItIsWhatItIsSpedUp = {
  id: "01a0676a-d722-7008-8bf9-bf1f94b7a77d",
  type: "page-type/release",
  slug: "jenna-raine-it-is-what-it-is-sped-up",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2023-08-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5NUll3pLYgdBrBsP1J5RVO",
      externalLink: "https://open.spotify.com/album/5NUll3pLYgdBrBsP1J5RVO",
    },
  ],
  title: "It Is What It Is (Sped Up)",
} as const satisfies Release
