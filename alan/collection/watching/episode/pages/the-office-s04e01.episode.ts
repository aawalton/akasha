import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e01 = {
  id: "01a18857-c368-7ae1-93c2-2c0e11d7823e",
  type: "page-type/episode",
  slug: "the-office-s04e01",
  description:
    'Michael comes to believe the office might be cursed in the wake of a freak accident. After scrutinizing each of his staffers\' religious beliefs, he organizes a charity 5K "fun run."',
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 1,
  publishedAt: "2007-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170244",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/1",
    },
  ],
  title: "Fun Run",
  episodeType: "standard",
  stillPath: "/6Hf8dsQB5BYS1JFiM8FZF1GdAOr.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
