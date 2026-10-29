import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e02 = {
  id: "01a18843-d150-72ae-a119-a4b2d24c901c",
  type: "page-type/episode",
  slug: "bluey-s02e02",
  description:
    "On a trip to Hammerbarn, Bluey and Bingo create their own mini-homes side-by-side in the trolley. But Bluey quickly gets jealous of her neighbour Bingo.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 2,
  publishedAt: "2020-03-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2194076",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/2",
    },
  ],
  title: "Hammerbarn",
  episodeType: "standard",
  stillPath: "/lIN7vBaTzPzv9Usl9OqQCZmGc9g.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
