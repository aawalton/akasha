import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e42 = {
  id: "01a18843-d14f-77dc-9c32-8b8ea113688d",
  type: "page-type/episode",
  slug: "bluey-s01e42",
  description:
    "Bluey plays Hide and Seek with Bingo, Mum and Dad, but is quickly distracted by her toys, leaving her family hiding around the house undiscovered. When she slows down and focuses, Bluey remembers the game and successfully finds her family.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 42,
  publishedAt: "2019-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1836013",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/42",
    },
  ],
  title: "Hide and Seek",
  episodeType: "standard",
  stillPath: "/5bF4qHS9itVNECu9zQt3XgWLbme.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
