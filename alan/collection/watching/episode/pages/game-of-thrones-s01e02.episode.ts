import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS01e02 = {
  id: "01a18849-08b1-7f8c-bad2-e98526aacf24",
  type: "page-type/episode",
  slug: "game-of-thrones-s01e02",
  description:
    "While Bran recovers from his fall, Ned takes only his daughters to Kings Landing. Jon Snow goes with his uncle Benjen to The Wall. Tyrion joins them.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-1"],
  position: 2,
  publishedAt: "2011-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63057",
      externalLink: "https://www.themoviedb.org/tv/1399/season/1/episode/2",
    },
  ],
  title: "The Kingsroad",
  episodeType: "standard",
  stillPath: "/l0GJx3IR8YasbztTJi5uK0XqkEo.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
