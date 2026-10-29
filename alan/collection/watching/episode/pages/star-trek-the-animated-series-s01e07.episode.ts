import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS01e07 = {
  id: "01a1887f-fdf1-75b6-92ef-712fd07f4644",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s01e07",
  description:
    "Stardate: 5554.4\n\nA race of plant people, and their master, have a plan to force peace onto the galaxy.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-1"],
  position: 7,
  publishedAt: "1973-10-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136170",
      externalLink: "https://www.themoviedb.org/tv/1992/season/1/episode/7",
    },
  ],
  title: "The Infinite Vulcan",
  episodeType: "standard",
  stillPath: "/A7sZDzuKK0zvj57F0DUU1xGfuuy.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
