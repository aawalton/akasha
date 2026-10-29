import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e29 = {
  id: "01a18843-d151-74d0-b658-ccf621a7aad8",
  type: "page-type/episode",
  slug: "bluey-s02e29",
  description:
    "It is Bluey's first trip to the cinema, but she's worried that the movie will be too scary. When Bingo starts running amok in the theatre, she must conquer her fear and help Dad out.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 29,
  publishedAt: "2020-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2480557",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/29",
    },
  ],
  title: "Movies",
  episodeType: "standard",
  stillPath: "/wFVhnckUgLhJRSOpWM2O9vOeRjw.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
