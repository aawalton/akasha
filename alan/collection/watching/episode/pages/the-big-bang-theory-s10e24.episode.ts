import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS10e24 = {
  id: "01a18856-400a-7925-bbd7-f7a579094416",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s10e24",
  description:
    "The gang is concerned when Sheldon’s former admirer, Dr. Ramona Nowitzki, resurfaces while Amy is away at Princeton.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-10"],
  position: 24,
  publishedAt: "2017-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1303313",
      externalLink: "https://www.themoviedb.org/tv/1418/season/10/episode/24",
    },
  ],
  title: "The Long Distance Dissonance",
  episodeType: "finale",
  stillPath: "/zz9pvqUVLq9OWoei50kYXfVXccH.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
