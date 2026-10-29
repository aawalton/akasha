import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e15 = {
  id: "01a1884b-ef80-7989-8fe7-932e1bff69cc",
  type: "page-type/episode",
  slug: "ncis-s19e15",
  description:
    "Parker's delinquent past resurfaces when NCIS is called to Philadelphia to investigate the death of a Petty Officer.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 15,
  publishedAt: "2022-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248859",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/15",
    },
  ],
  title: "Thick as Thieves",
  episodeType: "standard",
  stillPath: "/viiVQv0YezFpJo6SS9lEgcMGXTv.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
