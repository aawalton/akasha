import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const onePieceSeason23 = {
  id: "01a18850-100b-739f-a291-7c08cdc197f3",
  type: "page-type/season",
  slug: "one-piece-season-23",
  description:
    'After a daring escape from the Future Island Egghead, the Straw Hat Crew set their course for a legendary destination. Joined by the mighty Giant Warrior Pirates, they finally reach Elbaph, the long-awaited Land of Giants. New encounters with Giants, and long hoped-for reunions unfold. A colossal new chapter begins as the crew heads into an adventure unlike anything before, all in the pursuit of the ultimate treasure, the "One Piece!"',
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/one-piece"],
  position: 23,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "508271",
      externalLink: "https://www.themoviedb.org/tv/37854/season/23",
    },
  ],
  title: "Elbaph",
  posterPath: "/9L4GHTq4YZq1wVq51yFxrdindrB.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:38:30.731Z",
  updatedAt: "2026-10-29T15:38:30.731Z",
} as const satisfies Season
