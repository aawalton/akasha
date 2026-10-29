import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e02 = {
  id: "01a1884b-ef77-758f-b342-81a7cde1f5d2",
  type: "page-type/episode",
  slug: "ncis-s16e02",
  description:
    "After a Navy Lieutenant is found murdered in his hot tub, the team interviews several families in the victim’s peculiar neighborhood.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 2,
  publishedAt: "2018-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1574392",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/2",
    },
  ],
  title: "Love Thy Neighbor",
  episodeType: "standard",
  stillPath: "/f4MTZ2trgLw5bsMMX41kyfNrbld.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
