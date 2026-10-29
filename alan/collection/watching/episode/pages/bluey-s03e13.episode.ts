import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e13 = {
  id: "01a18843-d154-7fe2-a7be-dac8b3cb5479",
  type: "page-type/episode",
  slug: "bluey-s03e13",
  description:
    "Mum and Dad vow to only finish their boring housework when the kids stop acting silly, but that's never going to happen, so they end up trying the same approach themselves.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 13,
  publishedAt: "2021-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3366774",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/13",
    },
  ],
  title: "Housework",
  episodeType: "standard",
  stillPath: "/lLru77tl2gxGXMY5OlDLodfX1s9.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
