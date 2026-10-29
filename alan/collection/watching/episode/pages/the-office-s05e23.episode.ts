import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e23 = {
  id: "01a18857-c36a-723e-a21d-e0bdf8c653f1",
  type: "page-type/episode",
  slug: "the-office-s05e23",
  description:
    "Michael's new company struggles to make early morning deliveries while the office tries to get their expense reports in on time after Angela enforces Dunder Mifflin's policy.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 23,
  publishedAt: "2009-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170224",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/23",
    },
  ],
  title: "Broke",
  episodeType: "standard",
  stillPath: "/jOAVA3EHX9cJZWZpaDVkbZhBd9c.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
