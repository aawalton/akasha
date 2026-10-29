import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e07 = {
  id: "01a18856-c98f-7c96-9d3c-1ca74a9b1884",
  type: "page-type/episode",
  slug: "the-defenders-s04e07",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 7,
  publishedAt: "1964-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453959",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/7",
    },
  ],
  title: "Turning Point",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
