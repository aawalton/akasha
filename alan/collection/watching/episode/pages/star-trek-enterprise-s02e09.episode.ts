import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e09 = {
  id: "01a18852-d431-7e52-984b-a4a0643caace",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e09",
  description:
    "While Enterprise is surveying a black hole in a trinary star system, the stellar phenomenon causes strange effects on the crew.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 9,
  publishedAt: "2002-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15587",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/9",
    },
  ],
  title: "Singularity",
  episodeType: "standard",
  stillPath: "/fhvxqu3ABBeMmRQrhIvW7LipzQI.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
