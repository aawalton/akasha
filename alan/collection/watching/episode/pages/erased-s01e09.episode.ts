import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const erasedS01e09 = {
  id: "01a183d8-0f21-76ae-afed-5fbbc33f6da6",
  type: "page-type/episode",
  slug: "erased-s01e09",
  description:
    'After being "missing" for three days, Kayo returns home. Her mother, Akemi, sees Satoru and Sachiko standing a few paces behind...Will Kayo be safe at last?',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/erased-season-1"],
  position: 9,
  publishedAt: "2016-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1160302",
      externalLink: "https://www.themoviedb.org/tv/65249/season/1/episode/9",
    },
  ],
  title: "Closure",
  episodeType: "standard",
  stillPath: "/o46SNs16XqWfN7CMGhE2hN7Eiyx.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:48:57.376Z",
  updatedAt: "2026-10-28T18:48:57.376Z",
} as const satisfies Episode
