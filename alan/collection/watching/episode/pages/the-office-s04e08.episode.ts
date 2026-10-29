import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e08 = {
  id: "01a18857-c369-73e3-a71a-d65a476ad909",
  type: "page-type/episode",
  slug: "the-office-s04e08",
  description:
    "Michael is driving to New York with Jan where he is going to speak at her deposition. Jan is suing Dunder Mifflin for four million dollars over her wrongful termination. Michael is excited to testify and has memorized every answer Jan told him to.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 8,
  publishedAt: "2007-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170240",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/8",
    },
  ],
  title: "The Deposition",
  episodeType: "mid-season",
  stillPath: "/uk9gVkXaqPzP1LmDVUTgiBTwCFs.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
