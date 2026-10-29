import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS03e01 = {
  id: "01a18857-7c29-79e1-9834-5504ae47c737",
  type: "page-type/episode",
  slug: "the-mandalorian-s03e01",
  description: "The Mandalorian begins an important journey.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-3"],
  position: 1,
  publishedAt: "2023-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4082902",
      externalLink: "https://www.themoviedb.org/tv/82856/season/3/episode/1",
    },
  ],
  title: "Chapter 17: The Apostate",
  episodeType: "standard",
  stillPath: "/d3ZhqbBD8L1pNKjVP1zaDkOGuDT.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
