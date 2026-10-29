import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e11 = {
  id: "01a1887f-fdf1-71f4-bcce-3f9d746f04cb",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e11",
  description: "Stardate: 5577.3\n\nThe Enterprise crew begins to shrink after radiation exposure.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 11,
  publishedAt: "1973-11-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136175",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/11",
    },
  ],
  title: "The Terratin Incident",
  episodeType: "standard",
  stillPath: "/esuSWbXo0RHmPYGTfo1sMcQuDM3.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
