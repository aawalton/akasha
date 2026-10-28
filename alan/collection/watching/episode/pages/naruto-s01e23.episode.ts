import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e23 = {
  id: "01a183d1-bb4b-735a-afba-f60872a65643",
  type: "page-type/episode",
  slug: "naruto-s01e23",
  description:
    "A reunion of all the rookies isn't a very happy one, as all of them prepare to take the Chuunin Exam. With so many rivals around, Naruto's team will need help from a fellow ninja named Kabuto to know what they're up against. Will the group be able to last through the exam?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 23,
  publishedAt: "2003-03-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908148",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/23",
    },
  ],
  title: "Genin Takedown! All Nine Rookies Face Off!",
  episodeType: "standard",
  stillPath: "/8cusxVCLl6Vhz8z6EwLAvEPp0bV.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
