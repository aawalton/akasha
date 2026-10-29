import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e24 = {
  id: "01a1884b-ef6c-7635-8fd2-d5fad36c3415",
  type: "page-type/episode",
  slug: "ncis-s07e24",
  description: "Gibbs heads to Mexico to face his demons and make a startling decision.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 24,
  publishedAt: "2010-05-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334562",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/24",
    },
  ],
  title: "Rule Fifty-One",
  episodeType: "finale",
  stillPath: "/yIiOsgfTxNJlIX9k0Z581rj2AY3.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
