import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e15 = {
  id: "01a18843-d154-73fe-ba1f-004669b7c689",
  type: "page-type/episode",
  slug: "bluey-s03e15",
  description:
    "While waiting to be picked up from school, Jack plays at being a sailor trying to find his way back home to Australia. Meanwhile, Jack's Dad has got lost on route to collect him.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 15,
  publishedAt: "2021-12-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3366778",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/15",
    },
  ],
  title: "Explorers",
  episodeType: "standard",
  stillPath: "/8DNrhHZYTo7d4HQicSFdZtEtrKB.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
