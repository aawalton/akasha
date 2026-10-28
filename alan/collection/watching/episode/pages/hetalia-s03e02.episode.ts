import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e02 = {
  id: "01a183d7-7ce2-7c2f-a582-83cf69c4593d",
  type: "page-type/episode",
  slug: "hetalia-s03e02",
  description:
    "Greece and Japan get to know each other more. In another story, Chibitalia and Holy Roman Empire celebrate the Cat Festival.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 2,
  publishedAt: "2010-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797721",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/2",
    },
  ],
  title: "Greece and Japan's Relationship",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
