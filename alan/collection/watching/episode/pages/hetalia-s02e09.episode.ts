import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS02e09 = {
  id: "01a183d7-7ce1-7bfd-a5d9-8ea1ea3929f9",
  type: "page-type/episode",
  slug: "hetalia-s02e09",
  description:
    "Canada arrives late to a G8 meeting, but his absence and identity are barely recognized by the other nations. In another story, France decides to celebrate the Olympics.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-2"],
  position: 9,
  publishedAt: "2009-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797702",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2/episode/9",
    },
  ],
  title: "Canada's Missing",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
