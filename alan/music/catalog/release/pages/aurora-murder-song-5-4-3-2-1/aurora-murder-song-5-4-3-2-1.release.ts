import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraMurderSong54321 = {
  id: "01a0676a-d725-7018-81b8-8fdf2a7c7150",
  type: "page-type/release",
  slug: "aurora-murder-song-5-4-3-2-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2015-09-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3FsT7nfwI7tSgW02lCVjIv",
      externalLink: "https://open.spotify.com/album/3FsT7nfwI7tSgW02lCVjIv",
    },
  ],
  title: "Murder Song (5, 4, 3, 2, 1)",
} as const satisfies Release
