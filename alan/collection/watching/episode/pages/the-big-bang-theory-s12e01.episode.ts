import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS12e01 = {
  id: "01a18856-400b-771b-b138-7b5d0562ad15",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s12e01",
  description:
    "Sheldon and Amy's honeymoon runs aground in New York. Penny and Leonard discover they are uncomfortably similar to Amy's parents. Raj insults physicist Neil deGrasse Tyson and starts a Twitter war.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-12"],
  position: 1,
  publishedAt: "2018-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1534358",
      externalLink: "https://www.themoviedb.org/tv/1418/season/12/episode/1",
    },
  ],
  title: "The Conjugal Configuration",
  episodeType: "standard",
  stillPath: "/tH6udsYfheFElUCMtc10PoxzhHH.jpg",
  voteAverage: 9.9,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
