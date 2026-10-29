import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e01 = {
  id: "01a18857-c36d-7a3b-a0b0-cfee34d3832c",
  type: "page-type/episode",
  slug: "the-office-s08e01",
  description:
    "Robert California stops by for the first time as CEO and leaves behind a mysterious list that has a line down the middle and every member of the office on either one side or the other. The office members frantically try to figure out what it means. Meanwhile, the new manager Andy faces a crisis.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 1,
  publishedAt: "2011-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170291",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/1",
    },
  ],
  title: "The List",
  episodeType: "standard",
  stillPath: "/qwnrgo2fLNL3Zzuybj2UIzyBZ0Z.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
