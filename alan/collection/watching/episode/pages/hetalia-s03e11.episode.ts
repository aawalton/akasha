import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e11 = {
  id: "01a183d7-7ce2-739f-afe6-08639c845516",
  type: "page-type/episode",
  slug: "hetalia-s03e11",
  description:
    "China gets help from Japan on bootlegging, while in other stories: The Italy brothers wind up captured by England, and Germany learns that the Italian behavior is infectious.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 11,
  publishedAt: "2010-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797730",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/11",
    },
  ],
  title: "Chinese Copy",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
