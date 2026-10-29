import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS01e01 = {
  id: "01a18857-c365-7529-8b79-a008c0202cf4",
  type: "page-type/episode",
  slug: "the-office-s01e01",
  description:
    "A documentary crew arrives at the offices of Dunder Mifflin to observe the employees and learn about modern management. Manager Michael Scott tries to paint a happy picture, while sales rep Jim fights with his nemesis Dwight and flirts with receptionist Pam.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-1"],
  position: 1,
  publishedAt: "2005-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170135",
      externalLink: "https://www.themoviedb.org/tv/2316/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/axt2TV2b3FAs1ZEg1mdKV1ZJnfW.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
