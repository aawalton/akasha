import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const madeInAbyssS01e01 = {
  id: "01a183dd-0706-7c15-8ab8-61841dee16b5",
  type: "page-type/episode",
  slug: "made-in-abyss-s01e01",
  description:
    "While exploring the Abyss, Riko comes across something she has never seen before. How does this new discovery impact her?",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/made-in-abyss-season-1"],
  position: 1,
  publishedAt: "2017-07-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1333163",
      externalLink: "https://www.themoviedb.org/tv/72636/season/1/episode/1",
    },
  ],
  title: "The City of the Great Pit",
  episodeType: "standard",
  stillPath: "/2djztJ6q5fGe02ilS04lwXoByap.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:54:22.982Z",
  updatedAt: "2026-10-28T18:54:22.982Z",
} as const satisfies Episode
