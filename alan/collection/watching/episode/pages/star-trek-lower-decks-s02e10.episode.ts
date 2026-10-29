import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS02e10 = {
  id: "01a18852-f34b-7b40-ab44-6bc35d47ea6e",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s02e10",
  description:
    "In the season two finale, the U.S.S. Cerritos is tasked to aid another class starship on a first contact mission.",
  ownLength: 31,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-2"],
  position: 10,
  publishedAt: "2021-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3257086",
      externalLink: "https://www.themoviedb.org/tv/85948/season/2/episode/10",
    },
  ],
  title: "First First Contact",
  episodeType: "finale",
  stillPath: "/c3hk6948lCQ6Kfzr2dxa5Xu30jB.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
