import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdDriveByLovers = {
  id: "01a0676a-d71c-703a-9082-33ecb610152b",
  type: "page-type/release",
  slug: "em-beihold-drive-by-lovers",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2021-01-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QPKDiPisHERDdzj3Pj0tR",
      externalLink: "https://open.spotify.com/album/6QPKDiPisHERDdzj3Pj0tR",
    },
  ],
  title: "Drive by Lovers",
} as const satisfies Release
