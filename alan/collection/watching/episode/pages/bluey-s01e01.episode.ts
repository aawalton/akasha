import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e01 = {
  id: "01a18843-d14c-7304-ba0c-9d5c29c0c1c1",
  type: "page-type/episode",
  slug: "bluey-s01e01",
  description:
    "As Bluey and Bingo squabble over their magic xylophone (that has the power to freeze Dad in space and time) Dad seizes control and freezes Bluey, leaving Bingo as her only hope.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 1,
  publishedAt: "2018-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1583478",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/1",
    },
  ],
  title: "The Magic Xylophone",
  episodeType: "standard",
  stillPath: "/4vrYTRSUjQ6i9BuyBwAyFHBWfO6.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
