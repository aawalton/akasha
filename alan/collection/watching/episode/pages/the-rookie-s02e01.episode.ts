import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS02e01 = {
  id: "01a18885-4803-74b4-89ac-17f31d89ba22",
  type: "page-type/episode",
  slug: "the-rookie-s02e01",
  description:
    "Danger is ever-present as the officers of the Mid-Wilshire precinct grapple with the aftermath of a plotted attack on the city of Los Angeles, leaving Officer Bradford fighting for his life.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-rookie-season-2"],
  position: 1,
  publishedAt: "2019-09-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1842631",
      externalLink: "https://www.themoviedb.org/tv/79744/season/2/episode/1",
    },
  ],
  title: "Impact",
  episodeType: "standard",
  stillPath: "/jG4kPa7nIFjkWPYKn8RYlbm6omC.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
