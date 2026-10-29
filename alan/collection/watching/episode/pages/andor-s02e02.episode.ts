import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS02e02 = {
  id: "01a18843-1870-719f-83e5-3a325a901237",
  type: "page-type/episode",
  slug: "andor-s02e02",
  description:
    "Cassian caught in a rebel turf war. Mon’s wedding woes mount. The Ferrix survivors face inspection.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-2"],
  position: 2,
  publishedAt: "2025-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5747431",
      externalLink: "https://www.themoviedb.org/tv/83867/season/2/episode/2",
    },
  ],
  title: "Sagrona Teema",
  episodeType: "standard",
  stillPath: "/9g47SgFmhXkTnAOm9aYNHj4Fjnj.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
