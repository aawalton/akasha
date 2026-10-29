import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e22 = {
  id: "01a1884b-ef63-7300-b2d6-04a9796e6494",
  type: "page-type/episode",
  slug: "ncis-s01e22",
  description:
    "Gibbs' team investigate the death of a SEAL during a training exercise, and come to suspect that it wasn't an accident, but a murder.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 22,
  publishedAt: "2004-05-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334451",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/22",
    },
  ],
  title: "A Weak Link",
  episodeType: "standard",
  stillPath: "/1aGgvT2sIuqf4SUpjXINHEp5DiU.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
