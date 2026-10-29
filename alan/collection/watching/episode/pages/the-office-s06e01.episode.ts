import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e01 = {
  id: "01a18857-c36b-7d2b-9110-7b45bba51e4f",
  type: "page-type/episode",
  slug: "the-office-s06e01",
  description:
    "A few interns who stayed at Dunder-Mifflin over the summer end their internship. Michael announces some potentially damaging gossip about an employee to the rest of the office, then starts to spread false rumours about others to cover up what he has unwittingly revealed.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 1,
  publishedAt: "2009-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170181",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/1",
    },
  ],
  title: "Gossip",
  episodeType: "standard",
  stillPath: "/pWbVgfvhF7u0aFdhJJbzTQAOqdw.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
