import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2Snowtime = {
  id: "01a0676a-d729-7041-8f63-8a49569b23cf",
  type: "release",
  slug: "james-taylor-2-snowtime",
  title: "SnowTime",
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  ownLength: 5.8091,
  ownProgress: 5.8091,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ApahkquX5fjyoqg4SpNrD",
      externalLink: "https://open.spotify.com/album/7ApahkquX5fjyoqg4SpNrD",
    },
  ],
} as const satisfies Release
