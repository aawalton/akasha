import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS04e11 = {
  id: "01a183d7-7ce5-7c11-a74d-1420aeb6058c",
  type: "page-type/episode",
  slug: "hetalia-s04e11",
  description:
    'All of the countries are threatened with "embarrassing" photos to come to an April Fool\'s gathering in even more embarrassing costumes.',
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-4"],
  position: 11,
  publishedAt: "2013-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826975",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4/episode/11",
    },
  ],
  title: "Our Failure",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
