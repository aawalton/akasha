import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineSeeYouLater = {
  id: "01a0676a-d728-705d-960a-d30f7d6427c3",
  type: "page-type/release",
  slug: "jenna-raine-see-you-later",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2022-02-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nf6Ptrirj20PgJaGqZhcE",
      externalLink: "https://open.spotify.com/album/2nf6Ptrirj20PgJaGqZhcE",
    },
  ],
  title: "see you later",
} as const satisfies Release
