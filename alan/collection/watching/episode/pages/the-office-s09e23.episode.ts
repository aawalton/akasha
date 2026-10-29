import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e23 = {
  id: "01a18857-c36f-77bf-8248-ea599e7ec876",
  type: "page-type/episode",
  slug: "the-office-s09e23",
  description:
    "One year later, Dunder Mifflin employees past and present reunite for a panel discussion about the documentary and to attend Dwight and Angela's wedding.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 23,
  publishedAt: "2013-05-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170335",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/23",
    },
  ],
  title: "Finale",
  episodeType: "finale",
  stillPath: "/1pJtFmAS3TJuWoCaUrY904pqNFE.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
