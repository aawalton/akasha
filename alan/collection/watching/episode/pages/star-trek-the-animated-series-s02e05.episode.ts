import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS02e05 = {
  id: "01a1887f-fdf2-7ebd-a6c0-b45f1e8de5c5",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s02e05",
  description:
    "Stardate: 6063.4\n\nThe Enterprise runs into a being that once visited Earth and influenced the Mayan culture.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-2"],
  position: 5,
  publishedAt: "1974-10-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136188",
      externalLink: "https://www.themoviedb.org/tv/1992/season/2/episode/5",
    },
  ],
  title: "How Sharper Than a Serpent's Tooth",
  episodeType: "standard",
  stillPath: "/1XtVTYJJQP3GrNqOixBuBF7RuyN.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
