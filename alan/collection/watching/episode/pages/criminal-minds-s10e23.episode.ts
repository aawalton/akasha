import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS10e23 = {
  id: "01a18844-d7f3-7fc7-8869-165d733ee123",
  type: "page-type/episode",
  slug: "criminal-minds-s10e23",
  description:
    "When Kate's niece and her best friend Markayla are kidnapped, the BAU suspects an online predator engaged in sex trafficking who poses as a teenage boy.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-10"],
  position: 23,
  publishedAt: "2015-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1054495",
      externalLink: "https://www.themoviedb.org/tv/4057/season/10/episode/23",
    },
  ],
  title: "The Hunt",
  episodeType: "finale",
  stillPath: "/uapdvp24cSBZQHZTs3yIZyzN0G6.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
