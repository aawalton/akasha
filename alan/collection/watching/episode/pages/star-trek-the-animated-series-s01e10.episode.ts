import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e10 = {
  id: "01a1887f-fdf1-7d87-9211-915188054c5f",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e10",
  description:
    "Stardate: 4978.5\n\nSpace con artist Harry Mudd returns, selling a fake love potion.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 10,
  publishedAt: "1973-11-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136178",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/10",
    },
  ],
  title: "Mudd's Passion",
  episodeType: "standard",
  stillPath: "/4YGz8rZ5an3ES9w6FjoYE2L4GwR.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
