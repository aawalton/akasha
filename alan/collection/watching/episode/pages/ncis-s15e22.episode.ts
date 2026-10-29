import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS15e22 = {
  id: "01a1884b-ef77-7e78-bf7a-2ab1039b9fe5",
  type: "page-type/episode",
  slug: "ncis-s15e22",
  description:
    "When evidence reveals an NCIS team member is a hitman’s latest target, the team must search through old case files to determine who is seeking vengeance.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-15"],
  position: 22,
  publishedAt: "2018-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1472411",
      externalLink: "https://www.themoviedb.org/tv/4614/season/15/episode/22",
    },
  ],
  title: "Two Steps Back",
  episodeType: "standard",
  stillPath: "/gQ5BSNQj0VX2BGWK0DiGvjJWn9B.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
