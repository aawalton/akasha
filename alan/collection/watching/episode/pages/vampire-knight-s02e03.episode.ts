import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vampireKnightS02e03 = {
  id: "01a183d8-f258-73dc-b9ae-708e53cfab4f",
  type: "page-type/episode",
  slug: "vampire-knight-s02e03",
  description:
    "The Night Class goes to the Aido family’s vacation home during the long break, but Hanabusa decides to stay at the academy to investigate Kaname.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/vampire-knight-season-2"],
  position: 3,
  publishedAt: "2008-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553038",
      externalLink: "https://www.themoviedb.org/tv/17149/season/2/episode/3",
    },
  ],
  title: "The Azure Portrait",
  episodeType: "standard",
  stillPath: "/oGhVrgCMHaboR58mvw5q91HwwVv.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Episode
