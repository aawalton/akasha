import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e09 = {
  id: "01a18856-c990-716c-889d-6cea87f1b22a",
  type: "page-type/episode",
  slug: "the-defenders-s04e09",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 9,
  publishedAt: "1964-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453961",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/9",
    },
  ],
  title: "Comeback",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
