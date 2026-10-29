import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e23 = {
  id: "01a18843-d154-7158-8357-e981c2941f34",
  type: "page-type/episode",
  slug: "bluey-s03e23",
  description:
    "When Dad's accused of 'fluffing' in Bluey's face as he climbed out of bed, he's put on trial with Mum as the judge and Bluey and Bingo as witnesses. But what was Bluey doing there?",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 23,
  publishedAt: "2021-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3381142",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/23",
    },
  ],
  title: "Family Meeting",
  episodeType: "standard",
  stillPath: "/nNIMYZ5asUjZF1Q8n6jMlhCcaNU.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
