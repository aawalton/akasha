import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e02 = {
  id: "01a1887f-fdf0-74a1-b460-2a515e39e44f",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e02",
  description:
    "Stardate: 5373.4\n\nSpock travels back in time to prevent his death as a young Vulcan.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 2,
  publishedAt: "1973-09-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136166",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/2",
    },
  ],
  title: "Yesteryear",
  episodeType: "standard",
  stillPath: "/lBaxrzcQQaTx43oqBWDIDkxpNW5.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
