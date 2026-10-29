import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e03 = {
  id: "01a1887f-fdf0-7aa5-96e7-1f4d09391f89",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e03",
  description:
    "Stardate: 5371.3\n\nThe crew of the Enterprise races to find a way to stop a cloud from destroying inhabited planets.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 3,
  publishedAt: "1973-09-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136163",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/3",
    },
  ],
  title: "One of Our Planets Is Missing",
  episodeType: "standard",
  stillPath: "/paEw3P3ybMgW9IpFxOUJXto32RB.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
