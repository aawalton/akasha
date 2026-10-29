import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e03 = {
  id: "01a18856-c98f-735a-924e-ff0daf80cbf2",
  type: "page-type/episode",
  slug: "the-defenders-s04e03",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 3,
  publishedAt: "1964-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453956",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/3",
    },
  ],
  title: "Hero of the People",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
