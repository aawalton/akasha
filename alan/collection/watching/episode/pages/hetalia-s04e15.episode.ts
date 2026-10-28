import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS04e15 = {
  id: "01a183d7-7ce6-7b77-b89e-7bf44eab3399",
  type: "page-type/episode",
  slug: "hetalia-s04e15",
  description:
    "France meets a girl and takes her on a tour. They discuss the Hundred Years War, Joan of Arc, and what she means to France.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-4"],
  position: 15,
  publishedAt: "2013-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826979",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4/episode/15",
    },
  ],
  title: "A bientôt! Until We Meet Again!",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
