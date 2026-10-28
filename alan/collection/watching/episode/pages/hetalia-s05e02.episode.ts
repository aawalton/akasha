import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS05e02 = {
  id: "01a183d7-7ce6-7d6c-a95d-6b77198407e1",
  type: "page-type/episode",
  slug: "hetalia-s05e02",
  description:
    "The Axis as well as England and America try to manufacture food that stays edible during war. England gets a little surprise during tea time.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-5"],
  position: 2,
  publishedAt: "2015-07-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826986",
      externalLink: "https://www.themoviedb.org/tv/35138/season/5/episode/2",
    },
  ],
  title: "Let's Eat Military Rations!",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
