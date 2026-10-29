import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS02e04 = {
  id: "01a18856-c98c-75a9-bad8-9a55bdc8330a",
  type: "page-type/episode",
  slug: "the-defenders-s02e04",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-2"],
  position: 4,
  publishedAt: "1962-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453988",
      externalLink: "https://www.themoviedb.org/tv/11515/season/2/episode/4",
    },
  ],
  title: "The Seven Ghosts of Simon Gray",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
