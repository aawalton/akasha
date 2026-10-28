import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS01e10 = {
  id: "01a183da-4479-73d3-921b-370dfdf77430",
  type: "page-type/episode",
  slug: "k-on-s01e10",
  description:
    "The girls go on another training camp with their new member. Despite Azusa’s nagging, she’s the one that plays the most.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-1"],
  position: 10,
  publishedAt: "2009-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879084",
      externalLink: "https://www.themoviedb.org/tv/42253/season/1/episode/10",
    },
  ],
  title: "Another Training Camp!",
  episodeType: "standard",
  stillPath: "/oSjvCimmaSoehY71a4B2vxI52zN.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
