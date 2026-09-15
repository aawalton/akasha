import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelBillyJoelMoods = {
  id: "01a0676a-d719-7004-985f-09c2fed19dbb",
  type: "page-type/release",
  slug: "billy-joel-billy-joel-moods",
  title: "Billy Joel - Moods",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 19.2886,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-07-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "142xn3meDPG005SmZv06Cj",
      externalLink: "https://open.spotify.com/album/142xn3meDPG005SmZv06Cj",
    },
  ],
} as const satisfies Release
