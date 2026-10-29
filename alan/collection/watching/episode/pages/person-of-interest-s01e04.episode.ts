import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e04 = {
  id: "01a18851-3df2-720d-a17f-ddd78e73ae5a",
  type: "page-type/episode",
  slug: "person-of-interest-s01e04",
  description:
    "Reese and Finch get some help from Detective Fusco  as they surveil their latest POI, Dr. Megan Tillman, while she’s on call and after hours to unravel the threat surrounding the promising young physician.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 4,
  publishedAt: "2011-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64058",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/4",
    },
  ],
  title: "Cura Te Ipsum",
  episodeType: "standard",
  stillPath: "/zriRZv4meqnfmJmXrlZ5l775Gj9.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
