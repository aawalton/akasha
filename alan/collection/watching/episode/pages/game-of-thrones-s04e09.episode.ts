import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS04e09 = {
  id: "01a18849-08b3-785a-be1d-70a56d0b4f48",
  type: "page-type/episode",
  slug: "game-of-thrones-s04e09",
  description:
    "Jon Snow and the rest of the Night's Watch face the biggest challenge to the Wall yet.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-4"],
  position: 9,
  publishedAt: "2014-06-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63102",
      externalLink: "https://www.themoviedb.org/tv/1399/season/4/episode/9",
    },
  ],
  title: "The Watchers on the Wall",
  episodeType: "standard",
  stillPath: "/lBah4n16r10fdXlM4xe3WE5DzUK.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
