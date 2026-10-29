import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e08 = {
  id: "01a1887f-fdf1-7573-8fd6-56ce0ce0c8e7",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e08",
  description:
    "Stardate: 1254.4\n\nAt the center of the galaxy, the Enterprise discovers a race of powerful aliens.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 8,
  publishedAt: "1973-10-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136171",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/8",
    },
  ],
  title: "The Magicks of Megas-tu",
  episodeType: "standard",
  stillPath: "/zqg0m310rS2USDRlUUU2YBW12nm.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
