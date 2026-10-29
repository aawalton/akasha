import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S02e04 = {
  id: "01a18843-507f-78e8-8f8c-9143bfdc83e2",
  type: "page-type/episode",
  slug: "babylon-5-s02e04",
  description:
    'A giant explorer class ship comes to Babylon 5 for re-supply - its captain an old friend of Sheridan. Dr. Franklin gets on the command staff\'s nerves when he starts handing out "food plans".',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-the-coming-of-shadows"],
  position: 4,
  publishedAt: "1994-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235858",
      externalLink: "https://www.themoviedb.org/tv/3137/season/2/episode/4",
    },
  ],
  title: "A Distant Star",
  episodeType: "standard",
  stillPath: "/jLP5gyJJQsjcfcE3oMsCKH1GLp.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
