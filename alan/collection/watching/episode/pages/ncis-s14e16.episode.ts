import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e16 = {
  id: "01a1884b-ef75-7da8-9ee5-ba2e3dd36a59",
  type: "page-type/episode",
  slug: "ncis-s14e16",
  description:
    "Bishop is more determined than ever to seek revenge for the murder of Qasim, her late boyfriend, after Gibbs and the team find a new lead in the Chen case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 16,
  publishedAt: "2017-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1262238",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/16",
    },
  ],
  title: "A Many Splendored Thing",
  episodeType: "standard",
  stillPath: "/sppsgPa5jHFoqvYFK8Lhdk4a1HE.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
