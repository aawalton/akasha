import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS01e04 = {
  id: "01a183d4-acc2-7a9c-874e-32b74e2295c5",
  type: "page-type/episode",
  slug: "my-hero-academia-s01e04",
  description:
    "At the entrance exam, Izuku falls behind as the other students defeat faux villains left and right. Will he be able to get enough points to pass?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-1"],
  position: 4,
  publishedAt: "2016-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1183873",
      externalLink: "https://www.themoviedb.org/tv/65930/season/1/episode/4",
    },
  ],
  title: "Start Line",
  episodeType: "standard",
  stillPath: "/hfCtoXr6qQJFUmYSgwuoWMBhgdo.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
