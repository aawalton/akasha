import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e23 = {
  id: "01a18843-d151-78b7-bd66-755c61ecbdb6",
  type: "page-type/episode",
  slug: "bluey-s02e23",
  description:
    "During a game of Queens, Bluey and Bingo find that playing the butler is much more fun. But someone must play the Queen, even if it means not being afraid of a bit of hard work.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 23,
  publishedAt: "2020-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2218573",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/23",
    },
  ],
  title: "Queens",
  episodeType: "standard",
  stillPath: "/X9ktOXvkJsFj7OyLYQvXyL3kJl.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
