import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e42 = {
  id: "01a183d7-7ce4-7e29-9c91-b7c5f3a5b8a5",
  type: "page-type/episode",
  slug: "hetalia-s03e42",
  description:
    "Spain fights with France over Chibi Romano. Belgium and Netherlands comes to visit them.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 42,
  publishedAt: "2011-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797761",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/42",
    },
  ],
  title: "Boss Spain and Chibi Romano: The Battle of Garigliano",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
