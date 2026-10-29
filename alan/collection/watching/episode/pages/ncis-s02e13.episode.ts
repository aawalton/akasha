import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e13 = {
  id: "01a1884b-ef64-79df-89fd-98c91685fcc5",
  type: "page-type/episode",
  slug: "ncis-s02e13",
  description:
    'A "meat puzzle" starts when Ducky identifies the pieces of three bodies that were stuffed inside a barrel a few months ago. They turn out to be bodies of a judge, prosecutor, and jury foreman that worked with Ducky on a rape case ten years ago.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 13,
  publishedAt: "2005-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334508",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/13",
    },
  ],
  title: "The Meat Puzzle",
  episodeType: "standard",
  stillPath: "/yyIPwElKKSUweoyBuM3uJqbGndW.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
