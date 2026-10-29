import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e21 = {
  id: "01a18852-d433-71c3-95a5-0d6ff4a7869f",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e21",
  description:
    "An attempt to use a Xindi subspace corridor leads the Enterprise crew to a bizarre encounter with their own descendants.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 21,
  publishedAt: "2004-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15591",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/21",
    },
  ],
  title: "E²",
  episodeType: "standard",
  stillPath: "/uKqXCFucIjPaPpv6hDSiCLxC7tm.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
