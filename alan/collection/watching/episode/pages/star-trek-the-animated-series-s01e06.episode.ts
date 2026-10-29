import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e06 = {
  id: "01a1887f-fdf1-7e67-b8d3-15b9ad4bea1b",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e06",
  description: "Stardate: 5143.3\n\nThe Enterprise finds a long-lost explorer.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 6,
  publishedAt: "1973-10-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136168",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/6",
    },
  ],
  title: "The Survivor",
  episodeType: "standard",
  stillPath: "/u1SXuOUIL17zKXJS0v5Q8zqzqvQ.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
