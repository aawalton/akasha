import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e22 = {
  id: "01a183d7-7ce3-70c0-aca9-035b1b92903d",
  type: "page-type/episode",
  slug: "hetalia-s03e22",
  description: "The Anglo-Japanese Alliance story continues.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 22,
  publishedAt: "2010-08-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797740",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/22",
    },
  ],
  title: "The Anglo-Japanese Alliance has been formed",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
