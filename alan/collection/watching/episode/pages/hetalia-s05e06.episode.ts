import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS05e06 = {
  id: "01a183d7-7ce6-7c08-8e11-fa6411e454b5",
  type: "page-type/episode",
  slug: "hetalia-s05e06",
  description:
    "Germany looks to book smarts to figure out how to deal with Italy. Italy travels to Africa, only to end up running away from England.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-5"],
  position: 6,
  publishedAt: "2015-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826990",
      externalLink: "https://www.themoviedb.org/tv/35138/season/5/episode/6",
    },
  ],
  title: "African War Front! (1)",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
