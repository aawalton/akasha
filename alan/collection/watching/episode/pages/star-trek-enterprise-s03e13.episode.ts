import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e13 = {
  id: "01a18852-d432-7df4-ab19-1e265cd5ba1d",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e13",
  description:
    "An Andorian ship led by Commander Shran arrives in the Delphic Expanse to help Enterprise hone in on the Xindi super-weapon.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 13,
  publishedAt: "2004-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15609",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/13",
    },
  ],
  title: "Proving Ground",
  episodeType: "standard",
  stillPath: "/1pF4grfhgxaequ93Awe6XhFF7RK.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
