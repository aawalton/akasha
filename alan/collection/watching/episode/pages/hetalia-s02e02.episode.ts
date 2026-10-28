import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e02 = {
  id: "01a183d7-7ce0-7e01-8451-e177397362bc",
  type: "page-type/episode",
  slug: "hetalia-s02e02",
  description:
    "The Axis are ambushed by the Allies once more, but another strange visitor arrives to break up the fight, with Christmas presents in tow.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 2,
  publishedAt: "2009-07-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797695",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/2",
    },
  ],
  title: ":) in the World",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
