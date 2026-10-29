import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS03e04 = {
  id: "01a18856-c98d-7ecf-a57a-fd882abdd098",
  type: "page-type/episode",
  slug: "the-defenders-s03e04",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-3"],
  position: 4,
  publishedAt: "1963-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454046",
      externalLink: "https://www.themoviedb.org/tv/11515/season/3/episode/4",
    },
  ],
  title: "The Bagman",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
