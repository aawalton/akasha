import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e05 = {
  id: "01a1887f-fdf0-7bcb-a13c-5f06323ef289",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e05",
  description: "Stardate: 5392.4\n\nCyrano Jones introduces tribbles that cannot reproduce.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 5,
  publishedAt: "1973-10-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136169",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/5",
    },
  ],
  title: "More Tribbles, More Troubles",
  episodeType: "standard",
  stillPath: "/rQfQmaeezO2IEo8vgsVV9hOUE2k.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
