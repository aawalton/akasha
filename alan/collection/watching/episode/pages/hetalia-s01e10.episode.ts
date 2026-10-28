import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS01e10 = {
  id: "01a183d7-7cdf-7141-9c8a-2c2530fc8b19",
  type: "page-type/episode",
  slug: "hetalia-s01e10",
  description:
    'After he winds up uninvited to the second Allies meeting, France reflects on his history of past "glories" and "accomplishments".',
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-1"],
  position: 10,
  publishedAt: "2009-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797667",
      externalLink: "https://www.themoviedb.org/tv/35138/season/1/episode/10",
    },
  ],
  title: "France Reflects",
  episodeType: "standard",
  stillPath: "/g3fGuBU5zr4prI3LoL2w5SxO0tY.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
