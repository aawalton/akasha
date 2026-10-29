import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS23e04 = {
  id: "01a18855-c2a1-7d6a-9a7f-eb59e86ee5b0",
  type: "page-type/episode",
  slug: "studio-c-s23e04",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-23"],
  position: 4,
  publishedAt: "2026-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7785653",
      externalLink: "https://www.themoviedb.org/tv/68207/season/23/episode/4",
    },
  ],
  title: "Elmo Doesn't Feel Anything Anymore",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
