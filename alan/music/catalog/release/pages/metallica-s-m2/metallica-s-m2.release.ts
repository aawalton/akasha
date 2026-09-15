import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaSM2 = {
  id: "01a0676a-d728-7035-b902-eee454fd04b7",
  type: "release",
  slug: "metallica-s-m2",
  title: "S&M2",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 143.62585,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2020-08-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4vxkHVyS6D66Rwt0mpz0cS",
      externalLink: "https://open.spotify.com/album/4vxkHVyS6D66Rwt0mpz0cS",
    },
  ],
} as const satisfies Release
