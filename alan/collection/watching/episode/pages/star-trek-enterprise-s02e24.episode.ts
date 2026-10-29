import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e24 = {
  id: "01a18852-d432-7727-a0dc-7294a1613847",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e24",
  description:
    "Archer tells T'Pol the story of when he and a rival named A.G. Robinson were in competition for breaking the Warp 2 barrier.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 24,
  publishedAt: "2003-05-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15582",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/24",
    },
  ],
  title: "First Flight",
  episodeType: "standard",
  stillPath: "/cWW5it1EeZA1x4stcmxRzgSKhi4.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
