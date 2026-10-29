import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e14 = {
  id: "01a1884b-ef6d-712c-bf6e-d5f4bbf75705",
  type: "page-type/episode",
  slug: "ncis-s08e14",
  description:
    "The NCIS team undergoes mandatory psych evaluations while investigating the death of a Naval Commander.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 14,
  publishedAt: "2011-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334580",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/14",
    },
  ],
  title: "A Man Walks Into a Bar ...",
  episodeType: "standard",
  stillPath: "/4nNobOmJLVNmq1xrrBNEHZHZKQ4.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
