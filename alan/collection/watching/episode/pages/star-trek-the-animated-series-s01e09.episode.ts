import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e09 = {
  id: "01a1887f-fdf1-7a72-aa92-8a50a97c2079",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e09",
  description:
    'Stardate: 5591.2\n\nKirk returns to the "shore leave" planet, but it\'s not as peaceful as it was when they last saw it.',
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 9,
  publishedAt: "1973-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136173",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/9",
    },
  ],
  title: "Once Upon a Planet",
  episodeType: "standard",
  stillPath: "/k5F96bT0KdRfTnElVQn5DVEbVm8.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
