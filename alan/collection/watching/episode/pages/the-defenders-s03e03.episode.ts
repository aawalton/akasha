import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS03e03 = {
  id: "01a18856-c98d-7a86-896c-f21b11f7dd18",
  type: "page-type/episode",
  slug: "the-defenders-s03e03",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-3"],
  position: 3,
  publishedAt: "1963-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453971",
      externalLink: "https://www.themoviedb.org/tv/11515/season/3/episode/3",
    },
  ],
  title: "The Captive",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
