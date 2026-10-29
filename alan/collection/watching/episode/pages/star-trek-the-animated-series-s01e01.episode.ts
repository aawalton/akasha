import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e01 = {
  id: "01a1887f-fdf0-7a66-b4da-2d576e720f11",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e01",
  description:
    "Stardate: 5521.3\n\nIn orbit around a dead star, the Enterprise comes across a huge starship inhabited by a parasitic life form that threatens the entire ship.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 1,
  publishedAt: "1973-09-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136167",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/1",
    },
  ],
  title: "Beyond the Farthest Star",
  episodeType: "standard",
  stillPath: "/dQibE5mizZNGL1qXb79F5zhmKDo.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
