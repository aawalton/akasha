import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e11 = {
  id: "01a18852-d432-72c1-a513-f5a72701e455",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e11",
  description: "Archer and T'Pol travel back in time to 2004 Detroit to stop a Xindi plot.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 11,
  publishedAt: "2003-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15607",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/11",
    },
  ],
  title: "Carpenter Street",
  episodeType: "standard",
  stillPath: "/u68vQ35sXH2G8S0B86VEOJkOmor.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
