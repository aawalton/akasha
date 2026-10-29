import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e08 = {
  id: "01a18851-3df4-7457-ab9d-e2f6cae75d68",
  type: "page-type/episode",
  slug: "person-of-interest-s02e08",
  description: "The team is spread thin when a husband and wife’s numbers both come up",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 8,
  publishedAt: "2012-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64085",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/8",
    },
  ],
  title: "Til Death",
  episodeType: "standard",
  stillPath: "/fqGEZIUtdvjScT4Key26XTMN1FY.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
