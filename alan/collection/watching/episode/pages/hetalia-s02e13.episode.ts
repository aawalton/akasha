import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e13 = {
  id: "01a183d7-7ce1-7a67-8486-4edeb1dec18d",
  type: "page-type/episode",
  slug: "hetalia-s02e13",
  description:
    'A baby America is discovered in the "New World", though this discovery also sets off a fight for ownership of him.',
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 13,
  publishedAt: "2009-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797706",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/13",
    },
  ],
  title: "The Battle for America (1)",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
