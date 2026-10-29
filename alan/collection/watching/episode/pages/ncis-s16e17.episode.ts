import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e17 = {
  id: "01a1884b-ef78-7962-ba83-b0ae52150281",
  type: "page-type/episode",
  slug: "ncis-s16e17",
  description:
    "Director Vance is notified by the Pentagon that the nuclear submarine Gibbs and Bishop are aboard to conduct a murder investigation has gone radio silent.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 17,
  publishedAt: "2019-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1713427",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/17",
    },
  ],
  title: "Silent Service",
  episodeType: "standard",
  stillPath: "/q8p3S87V7sU52UzNAmZHfvLfZdh.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
