import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e03 = {
  id: "01a18857-c367-75f0-b503-568d90322439",
  type: "page-type/episode",
  slug: "the-office-s03e03",
  description:
    "Michael had made it a point to have Movie Monday every week. He called the office into the conference room to watch a 30-minute installment of Varsity Blues, but Jan made an unexpected visit and did not like what she saw.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 3,
  publishedAt: "2006-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170159",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/3",
    },
  ],
  title: "The Coup",
  episodeType: "standard",
  stillPath: "/yvtNK7aVaWV4pGtz2qkJl4YttvE.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
