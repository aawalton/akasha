import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdDriveByLovers = {
  id: "01a0676a-d71c-703a-9082-33ecb610152b",
  type: "page-type/release",
  slug: "em-beihold-drive-by-lovers",
  title: "Drive by Lovers",
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  ownLength: 3.518333,
  ownProgress: 3.518333,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2021-01-29",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QPKDiPisHERDdzj3Pj0tR",
      externalLink: "https://open.spotify.com/album/6QPKDiPisHERDdzj3Pj0tR",
    },
  ],
} as const satisfies Release
