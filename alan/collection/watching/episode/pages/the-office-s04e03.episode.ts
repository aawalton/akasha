import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e03 = {
  id: "01a18857-c368-7b3f-acd3-ebcf466acf88",
  type: "page-type/episode",
  slug: "the-office-s04e03",
  description:
    "Michael gleefully anticipates attending the company's Web-site launch party in New York. Meanwhile, Angela arranges a bash in Scranton, while Dwight gets wrapped up in a real paper chase: He tries to sell more paper than the Web site.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 3,
  publishedAt: "2007-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170248",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/3",
    },
  ],
  title: "Launch Party",
  episodeType: "standard",
  stillPath: "/vStj5UHaOsMVeMKFIeSbWk4Ouwd.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
