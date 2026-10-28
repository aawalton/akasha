import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e33 = {
  id: "01a183d8-0266-727b-9109-885e3dbc36de",
  type: "page-type/episode",
  slug: "monster-s01e33",
  description:
    "Dieter learns of a life threatening game that children are playing. Mr. Schuwald decides to donate his whole book collection to the Munich University Library under the suggestion of Karl and Johan.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 33,
  publishedAt: "2004-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749547",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/33",
    },
  ],
  title: "A Child's View",
  episodeType: "standard",
  stillPath: "/wLzZfg51P24TKL5zIOgqwz5kV8w.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
