import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaDarkSkyIsland = {
  id: "01a0676a-d71b-7068-9b76-e0741f525271",
  type: "page-type/release",
  slug: "enya-dark-sky-island",
  title: "Dark Sky Island",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-11-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "26qiUsjX8tgvAqb2H8bucZ",
      externalLink: "https://open.spotify.com/album/26qiUsjX8tgvAqb2H8bucZ",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
