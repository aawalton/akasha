import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e16 = {
  id: "01a1884b-ef6e-7999-876f-7acdeda044dd",
  type: "page-type/episode",
  slug: "ncis-s09e16",
  description:
    "Gibbs clashes with Dr. Samantha Ryan over the truth behind a Navy reservist's possible suicide.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 16,
  publishedAt: "2012-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334614",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/16",
    },
  ],
  title: "Psych Out",
  episodeType: "standard",
  stillPath: "/t7o41cdjDLX46xTTmIbENg2n6VI.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
