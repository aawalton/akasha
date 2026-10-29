import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e06 = {
  id: "01a1884a-e0e8-7139-8435-91dbb6d7672e",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e06",
  description:
    "The NCIS team must find a motive when they discover the body of a marine who had been living a double life as a wealthy bachelor.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 6,
  publishedAt: "2009-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557279",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/6",
    },
  ],
  title: "Keepin' It Real",
  episodeType: "standard",
  stillPath: "/k10vaqTRhhpc6osOpWXmW5BZ2KI.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
