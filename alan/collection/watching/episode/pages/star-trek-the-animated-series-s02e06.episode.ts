import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS02e06 = {
  id: "01a1887f-fdf2-7a43-86ec-1a9b08b240af",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s02e06",
  description:
    "Stardate: 6770.3\n\nWith Commodore Robert April (the first commander of the Enterprise) on board, Kirk pursues a ship plunging into a supernova, and enters a universe where time runs backwards.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-2"],
  position: 6,
  publishedAt: "1974-10-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136187",
      externalLink: "https://www.themoviedb.org/tv/1992/season/2/episode/6",
    },
  ],
  title: "The Counter-Clock Incident",
  episodeType: "finale",
  stillPath: "/4u3gH6PjmgtQ3ctokVRHiP74Av4.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
