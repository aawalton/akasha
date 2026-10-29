import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e13 = {
  id: "01a18856-c990-791f-ad5e-1c8eefe45ba0",
  type: "page-type/episode",
  slug: "the-defenders-s04e13",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 13,
  publishedAt: "1964-12-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454032",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/13",
    },
  ],
  title: "King of the Hill",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
