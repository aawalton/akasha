import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineSeeYouLater = {
  id: "01a0676a-d728-705d-960a-d30f7d6427c3",
  type: "page-type/release",
  slug: "jenna-raine-see-you-later",
  title: "see you later",
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  ownLength: 9.7569,
  ownProgress: 9.7569,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2022-02-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nf6Ptrirj20PgJaGqZhcE",
      externalLink: "https://open.spotify.com/album/2nf6Ptrirj20PgJaGqZhcE",
    },
  ],
} as const satisfies Release
