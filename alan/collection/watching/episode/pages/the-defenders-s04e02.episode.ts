import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e02 = {
  id: "01a18856-c98f-73c6-b99a-dd7a84678708",
  type: "page-type/episode",
  slug: "the-defenders-s04e02",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 2,
  publishedAt: "1964-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453953",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/2",
    },
  ],
  title: "The Seven Hundred-Year Old Gang (2)",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
