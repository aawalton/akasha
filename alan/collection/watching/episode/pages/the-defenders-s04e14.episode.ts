import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e14 = {
  id: "01a18856-c990-76fe-aba9-d57af161cc42",
  type: "page-type/episode",
  slug: "the-defenders-s04e14",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 14,
  publishedAt: "1965-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453968",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/14",
    },
  ],
  title: "Whipping Boy",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
