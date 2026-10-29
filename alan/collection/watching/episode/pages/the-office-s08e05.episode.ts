import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e05 = {
  id: "01a18857-c36d-7188-9a4f-a60623cf1a2b",
  type: "page-type/episode",
  slug: "the-office-s08e05",
  description:
    "Erin works to make a spooky, non-childish Halloween party with help from Gabe. Dwight becomes friends with Robert's son, and Pam and Jim debate the existence of ghosts. Meanwhile, Robert tries to figure out everyone's deepest fears.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 5,
  publishedAt: "2011-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170294",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/5",
    },
  ],
  title: "Spooked",
  episodeType: "standard",
  stillPath: "/18Qb60pxBFaQDb7kCxhqwBPcTCK.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
