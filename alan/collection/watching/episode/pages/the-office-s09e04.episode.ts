import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e04 = {
  id: "01a18857-c36e-77ea-ab45-e15d9fe4eb57",
  type: "page-type/episode",
  slug: "the-office-s09e04",
  description:
    "The staffers hit the road in a rented bus when the building is deemed unsafe. Meanwhile, Nellie reaches out to Andy for help in adopting a baby, and Jim uses pie to spread cheer to Pam.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 4,
  publishedAt: "2012-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170318",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/4",
    },
  ],
  title: "Work Bus",
  episodeType: "standard",
  stillPath: "/xXbmG475A38gxP7DUXDCdup6iSE.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
