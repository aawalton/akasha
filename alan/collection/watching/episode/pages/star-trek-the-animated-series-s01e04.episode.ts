import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e04 = {
  id: "01a1887f-fdf0-7ddf-9757-ae5480a948fe",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e04",
  description:
    "Stardate: 5483.7\n\nFemale crew members must take over the Enterprise when the men are incapacitated by a race of sirens.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 4,
  publishedAt: "1973-09-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136165",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/4",
    },
  ],
  title: "The Lorelei Signal",
  episodeType: "standard",
  stillPath: "/zp3bjqKkP26n4E23QJQNvOyrBVq.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
