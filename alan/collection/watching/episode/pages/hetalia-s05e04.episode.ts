import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS05e04 = {
  id: "01a183d7-7ce6-766f-b4c3-19db81d54a44",
  type: "page-type/episode",
  slug: "hetalia-s05e04",
  description:
    "A little bit of background information is given about the five Nordic states. Estonia is still trying to become a Nordic, much to the displeasure of the other two Baltics.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-5"],
  position: 4,
  publishedAt: "2015-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826988",
      externalLink: "https://www.themoviedb.org/tv/35138/season/5/episode/4",
    },
  ],
  title: "The Nordic Five +α",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
