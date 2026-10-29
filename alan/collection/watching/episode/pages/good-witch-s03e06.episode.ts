import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS03e06 = {
  id: "01a18849-3528-7952-b7f9-99d818e30966",
  type: "page-type/episode",
  slug: "good-witch-s03e06",
  description:
    "Abigail, jealous of all the attention Cassie gets from helping her customers, decides to sell “special” Venezuelan chocolates at her flower shop.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-3"],
  position: 6,
  publishedAt: "2017-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1313149",
      externalLink: "https://www.themoviedb.org/tv/61864/season/3/episode/6",
    },
  ],
  title: "Say It With Candy",
  episodeType: "standard",
  stillPath: "/trdMKX4YY8B6PtsT3xrFq9NbK2Q.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
