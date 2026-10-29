import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS02e02 = {
  id: "01a1887f-fdf1-7443-9391-c6f805441e40",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s02e02",
  description:
    "Stardate: 7403.6\n\nThe Enterprise crew is joined by a unpredictable alien called Ari bn Bem, an independent observer from the planet Pandro.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-2"],
  position: 2,
  publishedAt: "1974-09-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136184",
      externalLink: "https://www.themoviedb.org/tv/1992/season/2/episode/2",
    },
  ],
  title: "Bem",
  episodeType: "standard",
  stillPath: "/mWds2pMGIm5kOQxrT8TiOzLNOTi.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
