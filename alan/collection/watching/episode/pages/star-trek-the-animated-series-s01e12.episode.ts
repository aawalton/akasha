import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e12 = {
  id: "01a1887f-fdf1-77c2-ae39-426405822eca",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e12",
  description:
    "Stardate: 5267.6\n\nThe Enterprise crew must work with Klingons to escape from a pocket universe.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 12,
  publishedAt: "1973-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136179",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/12",
    },
  ],
  title: "The Time Trap",
  episodeType: "standard",
  stillPath: "/sTEnZNtMrAoijLf5FnTWin9WAIO.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
