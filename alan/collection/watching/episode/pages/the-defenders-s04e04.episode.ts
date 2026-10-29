import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e04 = {
  id: "01a18856-c98f-7cc3-92c7-75a14bdc6351",
  type: "page-type/episode",
  slug: "the-defenders-s04e04",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 4,
  publishedAt: "1964-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453957",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/4",
    },
  ],
  title: "Go-Between",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
