import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e04 = {
  id: "01a1884b-ef77-7c86-9e1f-35bbc18741ab",
  type: "page-type/episode",
  slug: "ncis-s16e04",
  description:
    "Gibbs’ quiet vacation at his remote cabin is interrupted by a surprise visit from Tobias Fornell and Navy Captain Phillip Brooks, as well as a call from NCIS asking for his help locating a robber hiding in the woods near him.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 4,
  publishedAt: "2018-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1575709",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/4",
    },
  ],
  title: "Third Wheel",
  episodeType: "standard",
  stillPath: "/wuRr5jZNnceoXihlYGFAZCFq9l4.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
