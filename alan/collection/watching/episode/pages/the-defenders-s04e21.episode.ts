import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e21 = {
  id: "01a18856-c990-70a2-8d36-829df323f689",
  type: "page-type/episode",
  slug: "the-defenders-s04e21",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 21,
  publishedAt: "1965-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453965",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/21",
    },
  ],
  title: "No-Knock",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
