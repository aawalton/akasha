import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS01e02 = {
  id: "01a183da-4478-7e23-b100-5a1b2bcb3287",
  type: "page-type/episode",
  slug: "k-on-s01e02",
  description:
    "Yui wants a guitar that is too expensive. All the band girls get part-time jobs to save up for the guitar. Yui might actually get it through a twist of fate.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-1"],
  position: 2,
  publishedAt: "2009-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879076",
      externalLink: "https://www.themoviedb.org/tv/42253/season/1/episode/2",
    },
  ],
  title: "Instruments!",
  episodeType: "standard",
  stillPath: "/gDVVSZ8VekACMpfdRfZihP5oKBX.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
