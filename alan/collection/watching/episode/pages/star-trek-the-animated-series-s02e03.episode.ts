import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS02e03 = {
  id: "01a1887f-fdf1-7ab1-9abd-411af238a756",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s02e03",
  description:
    "Stardate: 3183.3\n\nThe computer of the Enterprise gains partial sentience and starts playing practical jokes on the crew.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-2"],
  position: 3,
  publishedAt: "1974-09-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136186",
      externalLink: "https://www.themoviedb.org/tv/1992/season/2/episode/3",
    },
  ],
  title: "The Practical Joker",
  episodeType: "standard",
  stillPath: "/nWTHNPnUOI4NQV8ncFc7FhntTDe.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
