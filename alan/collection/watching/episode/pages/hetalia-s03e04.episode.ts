import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e04 = {
  id: "01a183d7-7ce2-7a36-ade3-57b8cc0e001c",
  type: "page-type/episode",
  slug: "hetalia-s03e04",
  description:
    "An episode featuring Poland and Lithuania, adapting part of Pact of Steel. Also features the strip France vs. Italy.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 4,
  publishedAt: "2010-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797723",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/4",
    },
  ],
  title: "The Plot to Conquer Poland",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
