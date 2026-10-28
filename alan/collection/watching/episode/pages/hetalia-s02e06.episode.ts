import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e06 = {
  id: "01a183d7-7ce1-7609-9798-339e0c672369",
  type: "page-type/episode",
  slug: "hetalia-s02e06",
  description:
    "Germany wakes up to find himself visited by Italy's grandfather, the Roman Empire. But didn't he fall long ago? And is it a dream, or something stranger?",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 6,
  publishedAt: "2009-08-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797699",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/6",
    },
  ],
  title: "With Grandpa Rome",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
