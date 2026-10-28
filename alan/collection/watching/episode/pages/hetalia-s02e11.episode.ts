import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e11 = {
  id: "01a183d7-7ce1-7238-a16b-344b07aefa06",
  type: "page-type/episode",
  slug: "hetalia-s02e11",
  description:
    "Russia and Germany form an alliance, while Italy fears that the other Axis Powers will eventually abandon him.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 11,
  publishedAt: "2009-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797704",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/11",
    },
  ],
  title: "Russia is Germany's New Best Friend?",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
