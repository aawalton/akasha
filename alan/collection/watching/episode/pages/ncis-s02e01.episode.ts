import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e01 = {
  id: "01a1884b-ef63-7ca5-a52a-5b13c889abd0",
  type: "page-type/episode",
  slug: "ncis-s02e01",
  description:
    "The wife and nine-year-old blind daughter of a Navy captain are kidnapped and the captain is a hostage in his own office, communicating with the kidnapper, who watches his every step via computer camera.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 1,
  publishedAt: "2004-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334496",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/1",
    },
  ],
  title: "See No Evil",
  episodeType: "standard",
  stillPath: "/gjTeJvwTMswAVVl4U5TFA98gP3B.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
