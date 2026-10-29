import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e05 = {
  id: "01a18851-3df6-77cc-88c9-81748c2f9e9b",
  type: "page-type/episode",
  slug: "person-of-interest-s04e05",
  description:
    "While Reese is forced to go to counseling for his violent tendencies, Root, Shaw and Finch try to help a new POI.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 5,
  publishedAt: "2014-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005686",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/5",
    },
  ],
  title: "Prophets",
  episodeType: "standard",
  stillPath: "/vFCke6lLx3YHLuB5l15kFwQZqee.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
