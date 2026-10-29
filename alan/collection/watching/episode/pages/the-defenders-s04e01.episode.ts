import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e01 = {
  id: "01a18856-c98f-7ab4-96a6-d0dba6754a31",
  type: "page-type/episode",
  slug: "the-defenders-s04e01",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 1,
  publishedAt: "1964-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453954",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/1",
    },
  ],
  title: "The Seven Hundred-Year Old Gang (1)",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
