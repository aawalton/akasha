import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e16 = {
  id: "01a1887f-fdf1-7fc8-8a83-3732b9024a08",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e16",
  description:
    "Stardate: 5683.1\n\nKirk and Spock are recruited for a heist to recover a stolen relic, which if not recovered could spark an galactic jihad.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 16,
  publishedAt: "1974-01-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136182",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/16",
    },
  ],
  title: "The Jihad",
  episodeType: "finale",
  stillPath: "/wGRJY0b5EnNFBsNv6AIbQLGlYAf.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
