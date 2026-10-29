import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e08 = {
  id: "01a1884b-ef67-7fa3-a436-b6e8e7c3a8b6",
  type: "page-type/episode",
  slug: "ncis-s05e08",
  description:
    "A murder investigation of a Navy Admiral takes a shocking turn when a woman, a political refugee, returns home to search for her husband.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 8,
  publishedAt: "2007-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334458",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/8",
    },
  ],
  title: "Designated Target",
  episodeType: "standard",
  stillPath: "/ft1uO9fqYkMisHBajVbq7EnEaYy.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
