import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e13 = {
  id: "01a1887f-fdf1-72f3-955a-bc5d58bfcf7f",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e13",
  description:
    "Stardate: 5499.9\n\nWhile exploring the planet Argo, Kirk and Spock are turned into water breathers.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 13,
  publishedAt: "1973-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136177",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/13",
    },
  ],
  title: "The Ambergris Element",
  episodeType: "standard",
  stillPath: "/fkARxf5CRmMtYQE8rK39kqdEdlf.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
