import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e05 = {
  id: "01a18852-d433-7e08-8a6d-03ccf438a2d9",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e05",
  description:
    "Arik Soong leads his band of Augments to a medical facility where hundreds of genetically enhanced embryos are still stored, intending to retrieve them and bring them to life.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 5,
  publishedAt: "2004-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15634",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/5",
    },
  ],
  title: "Cold Station 12 (2)",
  episodeType: "standard",
  stillPath: "/baDg83U5qG8OyTCTI9H8qXAWx91.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
