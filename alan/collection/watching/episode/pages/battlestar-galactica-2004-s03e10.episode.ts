import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const battlestarGalactica2004S03e10 = {
  id: "01a18843-80e8-77b4-b8a2-565bd8ae7d39",
  type: "page-type/episode",
  slug: "battlestar-galactica-2004-s03e10",
  description:
    'The Colonial fleet faces starvation when the food-processing machines are contaminated. Kat plays a vital role in the success or failure of the "Passage" through space.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/battlestar-galactica-2004-season-3"],
  position: 10,
  publishedAt: "2006-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "134195",
      externalLink: "https://www.themoviedb.org/tv/1972/season/3/episode/10",
    },
  ],
  title: "The Passage",
  episodeType: "standard",
  stillPath: "/2tyVBTOAuYroQx55QHNJr4ZxYLz.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:24:47.718Z",
  updatedAt: "2026-10-29T15:24:47.718Z",
} as const satisfies Episode
