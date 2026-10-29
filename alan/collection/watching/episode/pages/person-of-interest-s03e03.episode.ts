import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS03e03 = {
  id: "01a18851-3df5-7329-b736-fb209a274b44",
  type: "page-type/episode",
  slug: "person-of-interest-s03e03",
  description:
    "The team suspects the latest number to be a potential stalker/ killer. Root plots her escape from the institution and gives her psychiatrist a big surprise.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-3"],
  position: 3,
  publishedAt: "2013-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64104",
      externalLink: "https://www.themoviedb.org/tv/1411/season/3/episode/3",
    },
  ],
  title: "Lady Killer",
  episodeType: "standard",
  stillPath: "/yZJ1iVfcBmIy8F6GAXMzGN0Uwc8.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
